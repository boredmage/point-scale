import { CircleDashedCheck } from '@/components/icons';
import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { decryptJSON } from '@/lib/decryptor';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ResultType {
  id: string;
  course_code: string;
  course_title: string;
  course_units: string;
  level_id_fk: string;
  result: string;
}

const Import = () => {
  const params = useLocalSearchParams();
  const encryptedData = params['result'] as string;
  const addCourse = useCourseStore((state) => state.addCourse);
  const { addSemester, setActiveSemesterId } = useSemesterStore((state) => state);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      // console.log('AsyncStorage cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // console.log('Encrypted Data:', encryptedData);
    (async () => {
      try {
        const secretKey = 'your-secret-key';

        const decryptedData = await decryptJSON(encryptedData, secretKey);
        // console.log('Decrypted:', decryptedData);

        const level = decryptedData['level'];
        const semester = decryptedData['semester'];
        const result: ResultType[] = decryptedData['result'];

        await clearStorage();

        const semesterId = addSemester({
          session: level,
          semester: semester,
        });

        for (const course of result) {
          await addCourse({
            course_code: course.course_code,
            course_title: course.course_title,
            course_units: parseInt(course.course_units),
            result: parseFloat(course.result) || 0,
            session_id: semesterId,
          });
        }
        setActiveSemesterId(semesterId);
      } catch (error) {
        console.log('Error decrypting data:', error);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Results Import" description="Import your results" />
      <View className="mt-40 flex-1 flex-col items-center gap-8">
        <CircleDashedCheck width={140} height={140} strokeWidth={1} stroke="#5271FF" />
        <Text className="text-3xl uppercase text-[#5271FF]">Import Successful</Text>
      </View>
    </SafeAreaView>
  );
};

export default Import;
