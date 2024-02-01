<template>
  <div class="max-w-screen-xl mx-auto h-svh flex items-center p-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-lg shadow-sm w-full">
      <div class="col-span-1 space-y-2.5 flex flex-col justify-center">
        <h1 class="font-semibold text-gray-700 text-2xl md:text-3xl lg:text-4xl">Certificate Verification</h1>
        <p class="text-gray-500">Please Enter Your Certificate ID</p>
        <form @submit.prevent="searchCertificate">
          <label for="search-certificate" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search certificate</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              v-model="inputValue"
              type="text"
              id="search-certificate"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
              required
              @keypress.enter.prevent="searchCertificate"
            />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-800 hover:bg-blue-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2">Check</button>
          </div>
        </form>
      </div>
      <div class="col-span-1 flex items-center">
        <img src="https://ik.imagekit.io/fidelitas/page/search-certificate.jpg" alt="search-certificate" class="w-full md:max-w-sm rounded-lg ms-auto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const inputValue = ref('');

const searchCertificate = () => {
  if (inputValue.value.trim() !== '') {
    router.push({ path: '/certificate/' + inputValue.value });
  }
};
</script>
