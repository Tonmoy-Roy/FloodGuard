import feniflood from '../../public/Images/people-wearing-life-jackets-migration-crisis.jpg';
import insulin from '../../public/Images/insulin.png';
import shelter from '../../public/Images/feni shelter.png';
import recuebaby from '../../public/Images/rescue baby.png';

const STORIES = [
  {
    id: "r1",
    image: feniflood,
    quote: "5 members of a family were rescued safely from a rooftop in Feni Sadar after 18 hours of being trapped by floodwater.",
    familyCount: 5,
    location: "Feni Sadar, Feni",
    district: "Feni",
    volunteerName: "Rakib Hossain",
    volunteerRole: "Boat Volunteer",
    rescuedAt: "June 22, 2024",
    tag: "Family Rescue",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    id: "r2",
    image: insulin,
    quote: "An elderly woman with diabetes was airlifted to a shelter with medical support. She received insulin within the first hour.",
    familyCount: 1,
    location: "Daganbhuiyan, Feni",
    district: "Feni",
    volunteerName: "Dr. Farhana Islam",
    volunteerRole: "Medical Volunteer",
    rescuedAt: "June 25, 2024",
    tag: "Medical Emergency",
    tagColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    id: "r3",
    image: shelter,
    quote: "12 students from a school were safely evacuated after floodwater reached the second floor. All are now in the Feni shelter.",
    familyCount: 12,
    location: "Sonagazi, Feni",
    district: "Feni",
    volunteerName: "Mahfuz Rahman",
    volunteerRole: "Rescue Team Lead",
    rescuedAt: "June 28, 2024",
    tag: "Group Rescue",
    tagColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    id: "r4",
    image: recuebaby,
    quote: "A newborn baby and her mother were rescued within 30 minutes of the SOS alert being sent. The baby is healthy and safe.",
    familyCount: 2,
    location: "Parshuram, Feni",
    district: "Feni",
    volunteerName: "Nurse Sadia Begum",
    volunteerRole: "Medical Volunteer",
    rescuedAt: "July 1, 2024",
    tag: "Critical Rescue",
    tagColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  },
];

export default STORIES;