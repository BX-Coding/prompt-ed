import { BuildableType } from "@/components/buildable";
import { BuildableTagOption } from "@/store/editorStore";

export type LessonEntry = {
  title: string;
  description: string;
  content: string[];
};

export type FieldDescriptor = {
  type: BuildableType;
  value: string;
  options?: BuildableTagOption[];
};

const lessons = [
  {
    title: "Welcome to Neural Kingdom",
    description:
      "Take your first steps into the Neural Kingdom and into AI Image generation.",
    content: [
      "Welcome to the Neural Kingdom, where the Royal Court has tasked you with creating art for the kingdom to enjoy. But first, can you create an image of the Neural Kingdom? Use the prompt box below to write a short description of what you imagine the Neural Kingdom looks like, then press **Generate!**",
      "Look, this is what the AI generated from your prompt! Was it what you imagined? Don't worry if not, there will be other chances to make different images that you think of. Now that we understand how the system works, let us move forward to try some new generations.",
    ],
    fields: [[{}]],
    generations: 1,
  },
  {
    title: "Your Animal Companion",
    description:
      "Find yourself a friend to explore the neural kingdom with you!",
    content: [
      "Before you start on your quest to create art for the Neural Kingdom, how about generating an animal sidekick to join you on your adventure?",
      "Awesome! Next, what if you add a few specific details about your animal companion so that the generated image is exactly what you want? Use the size dropdown to specify the size you want for your animal companion.",
      "That's super cool! How about changing the color of your animal?",
      "Great! How about giving your animal companion a pattern?",
      "Awesome! If you're happy with your sidekick, you can press “Next” to move on to the next activity, or you can change your prompt to generate a new image.",
    ],
    fields: [],
    generations: 5,
  },
];

export default lessons;
