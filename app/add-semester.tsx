import FormField from '@/components/form-field';
import PageHeader from '@/components/page-header';
import PrimaryButton from '@/components/primary-button';
import TextInput from '@/components/text-input';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useSemesterStore } from '@/store/semester-store';
import { useFormik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const AddSemester = () => {
  const addSemesters = useSemesterStore((store) => store.addSemester);
  const insets = useSafeAreaInsets();

  const formData = useFormik({
    initialValues: {
      session: '',
      semester: '',
    },
    validationSchema: Yup.object().shape({
      session: Yup.string().required('Level is required'),
      semester: Yup.string().required('Semester is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const { session, semester } = values;

      addSemesters({ session, semester });
      toast('New Semester Added', `${session} ${semester} has been added successfully`);
      resetForm();
    },
  });

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
      <PageHeader title="Add semester" description="Add a new semester to your record" />
      <ScrollView
        contentContainerClassName="gap-4 px-5 pb-10 pt-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4 rounded-2xl bg-white p-4">
          <FormField label="Level" error={fieldError('session')}>
            <TextInput
              className={cn('bg-surface', fieldError('session') && 'border-[#DC3545]')}
              placeholder="e.g. 300L"
              autoCapitalize="characters"
              value={formData.values.session}
              onBlur={formData.handleBlur('session')}
              onChangeText={formData.handleChange('session')}
            />
          </FormField>

          <FormField label="Semester" error={fieldError('semester')}>
            <TextInput
              className={cn('bg-surface', fieldError('semester') && 'border-[#DC3545]')}
              placeholder="e.g. 2nd Semester"
              value={formData.values.semester}
              onBlur={formData.handleBlur('semester')}
              onChangeText={formData.handleChange('semester')}
            />
          </FormField>
        </View>

        <PrimaryButton
          title="Add semester"
          onPress={() => formData.handleSubmit()}
          disabled={!canSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddSemester;
