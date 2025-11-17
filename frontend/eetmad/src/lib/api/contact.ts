import apiClient from './client';
import type { ContactFormInput, ContactFormResponse } from '@/lib/types/contact.types';

export const contactApi = {
  submitContactForm: async (formData: ContactFormInput): Promise<ContactFormResponse> => {
    // Placeholder for actual API call
    console.log('Submitting contact form data:', formData);
    // In a real scenario, this would be an actual API call:
    // const { data } = await apiClient.post('/contact', formData);
    // return data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Your message has been sent successfully!' });
      }, 1000);
    });
  },
};
