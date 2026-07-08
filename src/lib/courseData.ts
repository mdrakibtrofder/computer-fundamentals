export interface Lesson {
  id: string; // e.g. "c1-l1"
  number: number;
  title: string;
}

export interface Chapter {
  id: string; // e.g. "chapter-1"
  number: number;
  title: string;
  lessons: Lesson[];
}

export const chapters: Chapter[] = [
  {
    id: "chapter-1",
    number: 1,
    title: "Introduction to Computers",
    lessons: [
      { id: "c1-l1", number: 1, title: "Basic Organization" },
      { id: "c1-l2", number: 2, title: "Types of Computers" },
      { id: "c1-l3", number: 3, title: "History and Generations" },
    ],
  },
  {
    id: "chapter-2",
    number: 2,
    title: "Number Systems and Codes",
    lessons: [
      { id: "c2-l1", number: 1, title: "Number Systems" },
      { id: "c2-l2", number: 2, title: "Conversion of Numbers" },
      { id: "c2-l3", number: 3, title: "Binary Arithmetic" },
      { id: "c2-l4", number: 4, title: "Data Representation and Codes" },
    ],
  },
  {
    id: "chapter-3",
    number: 3,
    title: "Digital Circuits",
    lessons: [
      { id: "c3-l1", number: 1, title: "Logic Functions and Logic gates" },
      { id: "c3-l2", number: 2, title: "Boolean Algebra and Logic Simplification" },
      { id: "c3-l4", number: 4, title: "Latches and Flipflops" },
      { id: "c3-l5", number: 5, title: "Shift Registers and Counters" },
    ],
  },
  {
    id: "chapter-4",
    number: 4,
    title: "Microcomputer System",
    lessons: [
      { id: "c4-l1", number: 1, title: "Microcomputer Basics" },
      { id: "c4-l2", number: 2, title: "Organisation of a Microcomputer" },
      { id: "c4-l4", number: 4, title: "Working Principal of a Microcomputer" },
      { id: "c4-l5", number: 5, title: "Motherboard and Adapter" },
    ],
  },
  {
    id: "chapter-5",
    number: 5,
    title: "Input and Output Devices",
    lessons: [
      { id: "c5-l1", number: 1, title: "Input/Output Operations" },
      { id: "c5-l2", number: 2, title: "Input Devices" },
      { id: "c5-l3", number: 3, title: "Output Devices" },
      { id: "c5-l4", number: 4, title: "Other Peripheral Devices" },
    ],
  },
  {
    id: "chapter-6",
    number: 6,
    title: "Microprocessors",
    lessons: [
      { id: "c6-l1", number: 1, title: "Introduction to Microprocessors" },
      { id: "c6-l2", number: 2, title: "ALU and Control" },
      { id: "c6-l4", number: 4, title: "Parallel Processing" },
    ],
  },
  {
    id: "chapter-7",
    number: 7,
    title: "Memory Organization",
    lessons: [
      { id: "c7-l1", number: 1, title: "Memory Basics" },
      { id: "c7-l2", number: 2, title: "Main Memory" },
      { id: "c7-l3", number: 3, title: "Secondary Memory" },
    ],
  },
  {
    id: "chapter-8",
    number: 8,
    title: "Computer Software",
    lessons: [
      { id: "c8-l1", number: 1, title: "Introduction and Classification" },
      { id: "c8-l3", number: 3, title: "Programming Languages" },
    ],
  },
  {
    id: "chapter-9",
    number: 9,
    title: "System Software and Operating Systems",
    lessons: [
      { id: "c9-l1", number: 1, title: "System Software" },
      { id: "c9-l2", number: 2, title: "Introduction to Operating Systems" },
    ],
  },
  {
    id: "chapter-12",
    number: 12,
    title: "Computer Networks and the Internet",
    lessons: [
      { id: "c12-l1", number: 1, title: "Introduction to Computer Networks" },
      { id: "c12-l2", number: 2, title: "Local Area Networks" },
      { id: "c12-l3", number: 3, title: "Wide Area Networks" },
      { id: "c12-l4", number: 4, title: "Introduction to the Internet" },
      { id: "c12-l5", number: 5, title: "Internet Services and Protocols" },
      { id: "c12-l6", number: 6, title: "Intranet and Extranet" },
    ],
  },
  {
    id: "chapter-13",
    number: 13,
    title: "Information Technology",
    lessons: [
      { id: "c13-l1", number: 1, title: "IT Concepts and Applications" },
      { id: "c13-l4", number: 4, title: "Electronic Commerce" },
    ],
  },
  {
    id: "chapter-14",
    number: 14,
    title: "Computers and Society",
    lessons: [
      { id: "c14-l1", number: 1, title: "Impact of Computers on Society" },
    ],
  },
];

// Helper to get flat list of lessons for next/prev navigation
export interface FlatLesson {
  id: string;
  number: number;
  title: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
}

export const flatLessons: FlatLesson[] = chapters.reduce<FlatLesson[]>((acc, ch) => {
  const chLessons = ch.lessons.map(l => ({
    ...l,
    chapterId: ch.id,
    chapterNumber: ch.number,
    chapterTitle: ch.title
  }));
  return [...acc, ...chLessons];
}, []);
