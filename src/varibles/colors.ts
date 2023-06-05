export interface Theme {
  // Background
  systemBackgroundGradient: string[];

  // Text
  textPrimary: string;
}

export const lightMode: Theme = {
  // Background
  systemBackgroundGradient: ['#3F8D73', '#1A434C', '#102F40', '#061A2F'],

  // Text
  textPrimary: '#fff',
};

export default lightMode;
