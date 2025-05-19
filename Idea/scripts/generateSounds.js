const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { AudioContext } = require('web-audio-api');

// Function to generate a "match" sound (success sound)
function generateMatchSound() {
  const audioCtx = new AudioContext();
  const duration = 0.5;
  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  // Generate a pleasant "ding" sound
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    const frequency = 880 + Math.sin(t * 10) * 50;
    data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-4 * t);
  }

  return buffer;
}

// Function to generate a "nope" sound (rejection sound)
function generateNopeSound() {
  const audioCtx = new AudioContext();
  const duration = 0.3;
  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  // Generate a quick descending tone
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    const frequency = 440 - t * 200;
    data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-5 * t);
  }

  return buffer;
}

// Save buffer as WAV file
function saveBufferAsWav(buffer, filename) {
  const wavData = audioBufferToWav(buffer);
  fs.writeFileSync(filename, Buffer.from(wavData));
}

// Generate and save the sounds
const matchSound = generateMatchSound();
const nopeSound = generateNopeSound();

saveBufferAsWav(matchSound, '../public/sounds/match.mp3');
saveBufferAsWav(nopeSound, '../public/sounds/nope.mp3');

console.log('Sound files generated successfully!'); 