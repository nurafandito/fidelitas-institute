<template>
  <div v-if="loading" class="flex items-center justify-center min-h-svh">
    <div role="status">
      <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else-if="certificate" class="max-w-screen-xl mx-auto">
    <div class="flex flex-col-reverse justify-center gap-2.5 lg:gap-5 p-5 lg:flex-row">
      <div class="space-y-2.5 lg:max-w-fit">
        <div class="flex gap-2.5 p-5 bg-gray-50 rounded-lg font-semibold">
          <svg class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
              clip-rule="evenodd"
            />
          </svg>
          Verified Certificate
        </div>
        <div class="p-5 bg-gray-50 rounded-lg space-y-2.5 shadow-lg md:text-nowrap">
          <div>
            <label class="text-xs text-gray-500">Type</label>
            <p class="font-semibold">{{ certificate.type }}</p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Class</label>
            <p class="font-semibold">{{ certificate.className }}</p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Name</label>
            <p class="font-semibold">{{ certificate.name }}</p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Certificate Issued</label>
            <p class="font-semibold">{{ certificate.issued }}</p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Certificate ID</label>
            <p class="font-semibold">{{ certificate.id }}</p>
          </div>
        </div>
      </div>
      <div class="w-full">
        <img :src="certificate.imageURL" :alt="`${certificate.name}`" class="rounded-lg" />
      </div>
    </div>
  </div>
  <div v-else class="min-h-svh flex items-center justify-center">
    <img src="https://ik.imagekit.io/fidelitas/page/not-found.jpg" alt="certificate-not-found" class="w-full sm:max-w-[500px] max-h-[500px]" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { useRoute } from 'vue-router';
import { db } from '@/firebase.js';

const loading = ref(true);
const certificate = ref(null);
const route = useRoute();

onMounted(async () => {
  const { company, type, year, month, id } = route.params;

  if (company && type && year && month && id) {
    const pathElements = ['certificates', company, type, year, month, id];
    const certificateDoc = doc(db, ...pathElements);

    try {
      const snapshot = await getDoc(certificateDoc);

      if (snapshot.exists()) {
        const certificateData = snapshot.data();
        certificate.value = {
          id: snapshot.id,
          ...certificateData,
        };

        if (certificateData.classId) {
          const storage = getStorage();
          const storagePath = `/certificate/${certificateData.classId}/${certificateData.name}.jpg`;
          const storageRefVar = storageRef(storage, storagePath);

          await Promise.all([getDownloadURL(storageRefVar).then((imageURL) => (certificate.value.imageURL = imageURL))]);
        } else {
          console.error('Class ID not found in certificate data');
        }
      } else {
        console.log('Certificate not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  } else {
    console.error('Missing route params.');
  }
});
</script>
