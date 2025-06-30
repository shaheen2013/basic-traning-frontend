export const test = {
  id: 39,
  started_at: "2025-06-27T13:39:19.000000Z",
  total_quiz: 15,
  quizzes: [
    // 1. Multiple Choice Question (Science) - Original
    {
      id: 79,
      type: "multiple_choice",
      time_limit: 0.3,
      title: "Science: Which elements are noble gases? (Select all that apply)",
      started_at: "2025-06-27T13:39:09.000000Z",
      ended_at: "2025-06-27T13:49:19.000000Z",
      submitted: false,
      is_submittable: true,
      questions: {
        id: 85,
        title: "Noble gases identification",
        options: [
          { id: 256, value: "Helium" },
          { id: 257, value: "Oxygen" },
          { id: 258, value: "Neon" },
          { id: 259, value: "Chlorine" },
          { id: 260, value: "Argon" },
        ],
      },
    },

    // 2. True/False Question (Geography) - Original
    {
      id: 80,
      type: "true_or_false",
      time_limit: 0.3,
      title: "Geography: The Amazon River is the longest river in the world.",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 86,
        title: "Amazon River fact check",
        options: [
          { id: 261, value: "True" },
          { id: 262, value: "False" },
        ],
      },
    },

    // 3. Single Choice Question (History) - Original
    {
      id: 81,
      type: "single",
      time_limit: 0.3,
      title: "History: Who was the first president of the United States?",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 87,
        title: "US Presidents",
        options: [
          { id: 263, value: "Thomas Jefferson" },
          { id: 264, value: "George Washington" },
          { id: 265, value: "Abraham Lincoln" },
          { id: 266, value: "John Adams" },
        ],
      },
    },

    // 4. Matching Question (Capital Cities) - Original
    {
      id: 82,
      type: "matching",
      time_limit: 0.3,
      title: "Geography: Match countries to their capitals",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: [
        {
          id: 88,
          title: "Japan",
          options: [
            { id: 267, value: "Tokyo" },
            { id: 268, value: "Beijing" },
            { id: 269, value: "Seoul" },
          ],
        },
        {
          id: 89,
          title: "France",
          options: [
            { id: 270, value: "London" },
            { id: 271, value: "Paris" },
            { id: 272, value: "Berlin" },
          ],
        },
        {
          id: 90,
          title: "Canada",
          options: [
            { id: 273, value: "Ottawa" },
            { id: 274, value: "Toronto" },
            { id: 275, value: "Montreal" },
          ],
        },
      ],
    },

    // 5. Multiple Choice Question (Math) - Original
    {
      id: 83,
      type: "multiple_choice",
      time_limit: 0.2,
      title: "Math: Which numbers are prime? (Select all that apply)",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 91,
        title: "Prime numbers identification",
        options: [
          { id: 276, value: "7" },
          { id: 277, value: "9" },
          { id: 278, value: "13" },
          { id: 279, value: "21" },
          { id: 280, value: "29" },
        ],
      },
    },

    // 6. True/False Question (Biology) - Original
    {
      id: 84,
      type: "true_or_false",
      time_limit: 0.3,
      title: "Biology: Humans have 46 chromosomes.",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 92,
        title: "Chromosomes count",
        options: [
          { id: 281, value: "True" },
          { id: 282, value: "False" },
        ],
      },
    },

    // 7. Multiple Choice Question (Chemistry)
    {
      id: 93,
      type: "multiple_choice",
      time_limit: 0.3,
      title: "Chemistry: What is the chemical symbol for gold?",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 94,
        title: "Element symbols",
        options: [
          { id: 283, value: "Au" },
          { id: 284, value: "Ag" },
          { id: 285, value: "Pb" },
          { id: 286, value: "Fe" },
        ],
      },
    },

    // 8. Single Choice Question (Literature)
    {
      id: 95,
      type: "single",
      time_limit: 0.2,
      title: "Literature: Who wrote 'Romeo and Juliet'?",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 96,
        title: "Authors",
        options: [
          { id: 287, value: "Charles Dickens" },
          { id: 288, value: "William Shakespeare" },
          { id: 289, value: "Jane Austen" },
          { id: 290, value: "Mark Twain" },
        ],
      },
    },

    // 9. Matching Question (Inventors)
    {
      id: 97,
      type: "matching",
      time_limit: 0.2,
      title: "History: Match inventors to their inventions",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: [
        {
          id: 98,
          title: "Thomas Edison",
          options: [
            { id: 291, value: "Light Bulb" },
            { id: 292, value: "Telephone" },
            { id: 293, value: "Airplane" },
          ],
        },
        {
          id: 99,
          title: "Alexander Graham Bell",
          options: [
            { id: 294, value: "Light Bulb" },
            { id: 295, value: "Telephone" },
            { id: 296, value: "Radio" },
          ],
        },
        {
          id: 100,
          title: "Wright Brothers",
          options: [
            { id: 297, value: "Airplane" },
            { id: 298, value: "Automobile" },
            { id: 299, value: "Steam Engine" },
          ],
        },
      ],
    },

    // 10. True/False Question (Astronomy)
    {
      id: 101,
      type: "true_or_false",
      time_limit: 0.2,
      title: "Astronomy: The Sun is a star.",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 102,
        title: "Astronomy facts",
        options: [
          { id: 300, value: "True" },
          { id: 301, value: "False" },
        ],
      },
    },

    // 11. Multiple Choice Question (Computer Science)
    {
      id: 103,
      type: "multiple_choice",
      time_limit: 0.2,
      title: "Computer Science: Which are programming languages? (Select all)",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 104,
        title: "Programming languages",
        options: [
          { id: 302, value: "Python" },
          { id: 303, value: "HTML" },
          { id: 304, value: "Java" },
          { id: 305, value: "CSS" },
          { id: 306, value: "JavaScript" },
        ],
      },
    },

    // 12. Single Choice Question (Music)
    {
      id: 107,
      type: "single",
      time_limit: 12,
      title: "Music: Who composed the 'Moonlight Sonata'?",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 108,
        title: "Classical composers",
        options: [
          { id: 312, value: "Mozart" },
          { id: 313, value: "Beethoven" },
          { id: 314, value: "Bach" },
          { id: 315, value: "Chopin" },
        ],
      },
    },

    // 13. Matching Question (Animal Classes)
    {
      id: 109,
      type: "matching",
      time_limit: 20,
      title: "Biology: Match animals to their classes",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: [
        {
          id: 110,
          title: "Human",
          options: [
            { id: 316, value: "Mammal" },
            { id: 317, value: "Reptile" },
            { id: 318, value: "Amphibian" },
          ],
        },
        {
          id: 111,
          title: "Frog",
          options: [
            { id: 319, value: "Mammal" },
            { id: 320, value: "Amphibian" },
            { id: 321, value: "Bird" },
          ],
        },
        {
          id: 112,
          title: "Eagle",
          options: [
            { id: 322, value: "Bird" },
            { id: 323, value: "Fish" },
            { id: 324, value: "Insect" },
          ],
        },
      ],
    },

    // 14. True/False Question (Physics)
    {
      id: 113,
      type: "true_or_false",
      time_limit: 8,
      title: "Physics: Light travels faster than sound.",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 114,
        title: "Physics facts",
        options: [
          { id: 325, value: "True" },
          { id: 326, value: "False" },
        ],
      },
    },

    // 15. Multiple Choice Question (Art)
    {
      id: 115,
      type: "multiple_choice",
      time_limit: 15,
      title:
        "Art: Which artists painted in the Renaissance period? (Select all)",
      started_at: null,
      ended_at: null,
      submitted: false,
      is_submittable: true,
      questions: {
        id: 116,
        title: "Art history",
        options: [
          { id: 327, value: "Leonardo da Vinci" },
          { id: 328, value: "Pablo Picasso" },
          { id: 329, value: "Michelangelo" },
          { id: 330, value: "Vincent van Gogh" },
          { id: 331, value: "Raphael" },
        ],
      },
    },
  ],
};
