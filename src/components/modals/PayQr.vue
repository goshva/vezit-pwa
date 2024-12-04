<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode'
const text = ref('https://platiqr.ru/?uuid=1000430533')
const qrCanvas = ref(null)

// Function to generate QR Code
const generateQRCode = (value) => {
  if (qrCanvas.value) {
    QRCode.toCanvas(qrCanvas.value, value, { width: 200, margin: 2 }, (error) => {
      if (error) {
        console.error(error)
        alert('Failed to generate QR code.')
      }
    })
  }
}

onMounted(() => {
  generateQRCode(text.value)
})
</script>

<template>
  <div class="block-content text-center">
    
    <canvas ref="qrCanvas"></canvas>
    <h5>Отсканируйте QR-code</h5>
  </div>
</template>
<style>
/* Optional styling for input */
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>