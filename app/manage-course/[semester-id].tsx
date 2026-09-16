import FormField from '@/components/form-field';
import PageHeader from '@/components/page-header';
import PrimaryButton from '@/components/primary-button';
import Text from '@/components/text';
import TextInput, { INPUT_HEIGHT } from '@/components/text-input';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const UNIT_OPTIONS = ['1', '2', '3', '4', '5', '6'];
const unitLabel = (unit: string) => `${unit} Unit${unit === '1' ? '' : 's'}`;

const AddCourse = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { addCourse, getResultById, updateCourse } = useCourseStore((store) => store);

  const courseId = params['course-id'] as string;
  const semesterId = params['semester-id'] as string;

  const course = getResultById(courseId);
  const semester = useSemesterStore((store) => store.semesters).find(
    (semester) => semester.id === semesterId,
  );

  const formData = useFormik({
    initialValues: {
      courseTitle: '',
      courseCode: '',
      courseUnit: '',
      courseScore: '',
      tempCourseUnit: '',
    },
    validationSchema: Yup.object().shape({
      courseTitle: Yup.string().required('Course title is required'),
      courseCode: Yup.string().required('Course code is required'),
      courseUnit: Yup.string().required('Course unit is required'),
      courseScore: Yup.number()
        .typeError('Course score must be a number')
        .required('Course score is required')
        .min(0, 'Course score must be at least 0')
        .max(100, 'Course score cannot exceed 100'),
    }),
    onSubmit: (values, { resetForm }) => {
      const { courseTitle, courseCode, courseUnit, courseScore } = values;

      if (course) {
        updateCourse(courseId, {
          course_code: courseCode,
          course_title: courseTitle,
          course_units: +courseUnit,
          result: +courseScore,
        });

        toast('Course Updated', `${courseCode} has been updated successfully`);
      } else {
        addCourse({
          course_code: courseCode,
          course_title: courseTitle,
          course_units: +courseUnit,
          result: +courseScore,
          session_id: semesterId,
        });

        toast('New Course Added', `${courseCode} has been added successfully`);
      }

      resetForm();
    },
  });

  useEffect(() => {
    if (course) {
      formData.setValues({
        courseTitle: course.course_title,
        courseCode: course.course_code,
        courseUnit: course.course_units.toString(),
        courseScore: course.result.toString(),
        tempCourseUnit: course.course_units.toString(),
      });
    }
  }, []);

  const fieldError = (name: keyof typeof formData.values) =>
    formData.touched[name] && formData.errors[name];

  const canSubmit =
    formData.isValid && !formData.isSubmitting && !formData.isValidating && formData.dirty;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ paddingTop: insets.top }}
    >
      <PageHeader
        title={course ? 'Update course' : 'Add course'}
        description={[semester?.session, semester?.semester].filter(Boolean).join(' · ')}
      />
      <ScrollView
        contentContainerClassName="gap-4 px-5 pb-10 pt-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4 rounded-2xl bg-white p-4">
          <FormField label="Course title" error={fieldError('courseTitle')}>
            <TextInput
              className={cn('bg-surface', fieldError('courseTitle') && 'border-[#DC3545]')}
              placeholder="e.g. Software Engineering"
              value={formData.values.courseTitle}
              onBlur={formData.handleBlur('courseTitle')}
              onChangeText={formData.handleChange('courseTitle')}
            />
          </FormField>

          <FormField label="Course code" error={fieldError('courseCode')}>
            <TextInput
              className={cn('bg-surface', fieldError('courseCode') && 'border-[#DC3545]')}
              placeholder="e.g. CSC 301"
              autoCapitalize="characters"
              value={formData.values.courseCode}
              onBlur={formData.handleBlur('courseCode')}
              onChangeText={formData.handleChange('courseCode')}
            />
          </FormField>

          <View className="flex-row items-start gap-3">
            <View className="flex-1">
              <FormField label="Score" error={fieldError('courseScore')}>
                <TextInput
                  className={cn('bg-surface', fieldError('courseScore') && 'border-[#DC3545]')}
                  placeholder="0 – 100"
                  value={formData.values.courseScore}
                  onBlur={formData.handleBlur('courseScore')}
                  onChangeText={formData.handleChange('courseScore')}
                  keyboardType="numeric"
                />
              </FormField>
            </View>
            <View className="flex-1">
              <FormField label="Course unit" error={fieldError('courseUnit')}>
                {Platform.OS === 'ios' ? (
                  <Pressable
                    style={{ height: INPUT_HEIGHT }}
                    className={cn(
                      'flex-row items-center justify-between rounded-lg border border-line bg-surface px-3.5',
                      fieldError('courseUnit') && 'border-[#DC3545]',
                    )}
                    onPress={() => {
                      formData.setFieldValue(
                        'tempCourseUnit',
                        formData.values.courseUnit || UNIT_OPTIONS[0],
                      );
                      setIsPickerVisible(true);
                    }}
                  >
                    <Text
                      className={cn(
                        'text-base',
                        formData.values.courseUnit ? 'text-ink' : 'text-faint',
                      )}
                    >
                      {formData.values.courseUnit
                        ? unitLabel(formData.values.courseUnit)
                        : 'Select'}
                    </Text>
                    <Feather name="chevron-down" size={18} color="#6B6E85" />
                  </Pressable>
                ) : (
                  <View
                    style={{ height: INPUT_HEIGHT }}
                    className={cn(
                      'justify-center overflow-hidden rounded-lg border border-line bg-surface',
                      fieldError('courseUnit') && 'border-[#DC3545]',
                    )}
                  >
                    <Picker
                      selectedValue={formData.values.courseUnit}
                      onValueChange={(itemValue) => {
                        formData.setFieldValue('courseUnit', itemValue);
                      }}
                      style={{ color: '#15172B', height: INPUT_HEIGHT, marginVertical: -4 }}
                      dropdownIconColor="#6B6E85"
                    >
                      <Picker.Item label="Select" value="" enabled={false} color="#9A9DB3" />
                      {UNIT_OPTIONS.map((unit) => (
                        <Picker.Item key={unit} label={unitLabel(unit)} value={unit} />
                      ))}
                    </Picker>
                  </View>
                )}
              </FormField>
            </View>
          </View>
        </View>

        <PrimaryButton
          title={course ? 'Update course' : 'Add course'}
          onPress={() => formData.handleSubmit()}
          disabled={!canSubmit}
        />
      </ScrollView>

      {Platform.OS === 'ios' ? (
        <Modal visible={isPickerVisible} transparent animationType="fade">
          <Pressable className="flex-1 bg-ink/40" onPress={() => setIsPickerVisible(false)} />
          <View className="rounded-t-3xl bg-white" style={{ paddingBottom: insets.bottom }}>
            <View className="flex-row items-center justify-between border-b border-line px-5 py-4">
              <Text className="text-lg font-medium text-ink">Course unit</Text>
              <Pressable
                hitSlop={8}
                onPress={() => {
                  formData.setFieldValue('courseUnit', formData.values.tempCourseUnit);
                  setIsPickerVisible(false);
                }}
              >
                <Text className="text-base font-medium text-primary">Done</Text>
              </Pressable>
            </View>
            <Picker
              selectedValue={formData.values.tempCourseUnit}
              onValueChange={(itemValue) => {
                formData.setFieldValue('tempCourseUnit', itemValue);
              }}
            >
              {UNIT_OPTIONS.map((unit) => (
                <Picker.Item key={unit} label={unitLabel(unit)} value={unit} />
              ))}
            </Picker>
          </View>
        </Modal>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default AddCourse;
