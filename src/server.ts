import axios from 'axios';
import readline from 'readline';

interface GenderizeResponse {
  name: string;
  gender: string;
  probability: number;
  count: number;
}

async function getGenderInfo(name: string): Promise<void> {
  try {
    const response = await axios.get<GenderizeResponse>(`https://api.genderize.io?name=${name}`);

    const { gender, probability, count } = response.data;

    console.log(`The name "${name}" is most likely ${gender} (probability: ${probability}, count: ${count})`);
  } catch (error) {
    console.error('Something went wrong:', error.message);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter a name: ', (name) => {
  getGenderInfo(name);
  rl.close();
});
