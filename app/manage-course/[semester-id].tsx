import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import TextInput from '@/components/text-input';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const AddCourse = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const params = useLocalSearchParams();
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

  return (
    <SafeAreaView className="flex-1">
      <PageHeader
        title={course ? 'Update Course' : 'Add New Course'}
        description={(semester?.session || '') + (semester?.semester || '')}
      />
      <View className="mx-auto mt-12 w-11/12 gap-4">
        <View>
          <Text className="mb-1 text-[#606067]">Course Title</Text>
          <TextInput
            className={cn(
              'p-2 font-system',
              formData.touched.courseTitle && formData.errors.courseTitle
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            placeholder="e.g. Software Engineering"
            value={formData.values.courseTitle}
            onBlur={formData.handleBlur('courseTitle')}
            onChangeText={formData.handleChange('courseTitle')}
          />
        </View>

        <View>
          <Text className="mb-1 text-[#606067]">Course Code</Text>
          <TextInput
            className={cn(
              'p-2 font-system',
              formData.touched.courseCode && formData.errors.courseCode
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            placeholder="e.g. CSC 301"
            value={formData.values.courseCode}
            onBlur={formData.handleBlur('courseCode')}
            onChangeText={formData.handleChange('courseCode')}
          />
        </View>

        <View>
          <Text className="mb-1 text-[#606067]">Score</Text>
          <TextInput
            className={cn(
              'p-2 font-system',
              formData.touched.courseScore && formData.errors.courseScore
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            placeholder="0 - 100"
            // value={courseScore}
            // onChangeText={setCourseScore}
            value={formData.values.courseScore}
            onBlur={formData.handleBlur('courseScore')}
            onChangeText={formData.handleChange('courseScore')}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="mb-1 text-[#606067]">Course Unit</Text>
          {Platform.OS === 'ios' ? (
            <View>
              <Pressable
                className={cn(
                  'flex-row justify-between rounded-lg border p-3 font-system',
                  formData.touched.courseUnit && formData.errors.courseUnit
                    ? 'border-red-500'
                    : 'border-gray-300',
                )}
                onPress={() => {
                  // setTempCourseUnit(courseUnit);
                  formData.setFieldValue('tempCourseUnit', formData.values.courseUnit);
                  setIsPickerVisible(true);
                }}
              >
                <Text
                  className={cn(
                    formData.values.courseUnit ? 'text-black' : 'text-[#6060677f]',
                    'font-system',
                  )}
                >
                  {formData.values.courseUnit
                    ? `${formData.values.courseUnit} Unit${formData.values.courseUnit !== '1' ? 's' : ''}`
                    : 'Select Unit'}
                </Text>
                <AntDesign name="down" size={16} color="#606067" />
              </Pressable>

              <Modal visible={isPickerVisible} transparent={true} animationType="fade">
                <View className="flex-1 bg-black/50">
                  <View className="mt-auto bg-white">
                    <View className="flex-row justify-end border-b border-gray-200 p-4">
                      <Pressable
                        onPress={() => {
                          // setCourseUnit(tempCourseUnit);
                          formData.setFieldValue('courseUnit', formData.values.tempCourseUnit);
                          setIsPickerVisible(false);
                        }}
                      >
                        <Text className="font-semibold text-primary">Done</Text>
                      </Pressable>
                    </View>
                    <Picker
                      // selectedValue={tempCourseUnit}
                      selectedValue={formData.values.tempCourseUnit}
                      onValueChange={(itemValue) => {
                        // setTempCourseUnit(itemValue);
                        formData.setFieldValue('tempCourseUnit', itemValue);
                      }}
                    >
                      <Picker.Item label="1 Unit" value="1" />
                      <Picker.Item label="2 Units" value="2" />
                      <Picker.Item label="3 Units" value="3" />
                      <Picker.Item label="4 Units" value="4" />
                      <Picker.Item label="5 Units" value="5" />
                      <Picker.Item label="6 Units" value="6" />
                    </Picker>
                  </View>
                </View>
              </Modal>
            </View>
          ) : (
            <View className="">
              <Picker
                // selectedValue={courseUnit}
                selectedValue={formData.values.courseUnit}
                // onValueChange={(itemValue) => setCourseUnit(itemValue)}
                onValueChange={(itemValue) => {
                  formData.setFieldValue('courseUnit', itemValue);
                }}
              >
                <Picker.Item label="1 Unit" value="1" />
                <Picker.Item label="2 Units" value="2" />
                <Picker.Item label="3 Units" value="3" />
                <Picker.Item label="4 Units" value="4" />
                <Picker.Item label="5 Units" value="5" />
                <Picker.Item label="6 Units" value="6" />
              </Picker>
            </View>
          )}
        </View>

        <Pressable
          className="mt-4 rounded-lg bg-primary py-3 disabled:opacity-50"
          onPress={() => formData.handleSubmit()}
          disabled={
            !formData.isValid || formData.isSubmitting || formData.isValidating || !formData.dirty
          }
        >
          <Text className="text-center text-xl text-white">
            {course ? 'Update Course' : 'Add Course'}
          </Text>
        </Pressable>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const ErrorText = ({ error }: { error: string | undefined }) => (
  <Text className="text-sm text-red-500">{error}</Text>
);

export default AddCourse;
