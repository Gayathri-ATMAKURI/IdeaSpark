import { useEffect, useRef } from 'react';

// Short, simple sound effects
const MATCH_SOUND = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/+7DEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAYbUxJfmAAAA';

const NOPE_SOUND = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/+7DEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAADAAAGhgBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAYbf/bZc';

interface SoundEffectsProps {
  playSwipeRight: boolean;
  playSwipeLeft: boolean;
}

const SoundEffects: React.FC<SoundEffectsProps> = ({ playSwipeRight, playSwipeLeft }) => {
  const rightAudioRef = useRef<HTMLAudioElement | null>(null);
  const leftAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements
    rightAudioRef.current = new Audio(MATCH_SOUND);
    leftAudioRef.current = new Audio(NOPE_SOUND);

    // Preload the sounds
    rightAudioRef.current.load();
    leftAudioRef.current.load();

    return () => {
      if (rightAudioRef.current) {
        rightAudioRef.current.pause();
        rightAudioRef.current = null;
      }
      if (leftAudioRef.current) {
        leftAudioRef.current.pause();
        leftAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (playSwipeRight && rightAudioRef.current) {
      rightAudioRef.current.currentTime = 0;
      rightAudioRef.current.play().catch(error => {
        console.warn('Failed to play match sound:', error);
      });
    }
  }, [playSwipeRight]);

  useEffect(() => {
    if (playSwipeLeft && leftAudioRef.current) {
      leftAudioRef.current.currentTime = 0;
      leftAudioRef.current.play().catch(error => {
        console.warn('Failed to play nope sound:', error);
      });
    }
  }, [playSwipeLeft]);

  return null; // No need to render audio elements in the DOM
};

export default SoundEffects; 