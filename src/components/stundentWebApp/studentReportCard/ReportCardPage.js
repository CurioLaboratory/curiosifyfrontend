// ReportCardPage.js
import React from 'react';
import StudentDetails from '../studentReportCard/StudentDetails';
import MarkingDetails from '../studentReportCard/MarkingDetails';
import ScoreDetails from '../studentReportCard/ScoreDetails';
import ActivitiesConduct from '../studentReportCard/ActivitiesConduct';
import Grades from '../studentReportCard/Grades';
import GradingScale from '../studentReportCard/GradeScale';
import '../studentReportCard/ReportCardPage.scss'

const ReportCardPage = () => {
    const student = {
      name: 'Jane H',
      classNumber: '191',
      batchYear: '2023-2024',
      classTeacher: 'Jennifer',
      examination: 'Final Year',
      grade: 'B',
      photo: 'path/to/photo.jpg',
    };
  
    const subjects = [
      { name: 'English', marks: 'Marks', lower: 56, upper: 100 },
      { name: 'Maths', marks: 'Marks', lower: 56, upper: 'Upper' },
      { name: 'Science', marks: 'Marks', lower: 56, upper: 'Upper' },
      { name: 'Socials', marks: 'Marks', lower: 56, upper: 'Upper' },
      { name: 'Hindi', marks: 'Marks', lower: 56, upper: 'Upper' },
      { name: 'ECA', marks: 'Marks', lower: 56, upper: 'Upper' },
    ];
  
    const score = {
      percentage: 82,
      grade: 'B',
    };
  
    const activities = [
      { name: 'Attentiveness', completion: 91 },
      { name: 'Punctuality', completion: 51 },
    ];
  
    const grades = {
      finalGrade: 'B',
      aPlus: 2,
      b: 1,
      bPlus: 6,
    };
  
    return (
      <div className="report-card-page">
        <StudentDetails student={student} />
        <div className="main-content2">
          <MarkingDetails subjects={subjects} />
          <ScoreDetails score={score} />
          <ActivitiesConduct activities={activities} />
        </div>
        <Grades grades={grades} />
        <GradingScale />
      </div>
    );
  };
  

export default ReportCardPage;













//tailwind
// // ReportCardPage.js
// import React from 'react';
// import { Download, ChevronDown } from "lucide-react";


// const ReportCardPage = () => {
//   return (
//     <div className="max-w-full p-6 space-y-6">
//       {/* Student Details */}
//       <div className="bg-white rounded-lg p-6 shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">Student Details</h2>
//         <div className="flex items-start gap-6">
//           <img
//             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"
//             alt="Student profile"
//             className="w-24 h-24 rounded-lg object-cover"
//           />
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
//             <div>
//               <p className="text-gray-600 text-sm">Student Name:</p>
//               <p className="font-medium">Jana H</p>
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Class Number:</p>
//               <p className="font-medium">191</p>
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Examination:</p>
//               <p className="font-medium">Final Year</p>
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Batch-Year:</p>
//               <p className="font-medium">2023-2024</p>
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Class Teacher:</p>
//               <p className="font-medium">Jennifer</p>
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Grade:</p>
//               <p className="font-medium">B</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Marking Details */}
//         <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Marking Details</h2>
//             <button className="flex items-center text-gray-600 text-sm">
//               Final Year <ChevronDown className="w-4 h-4 ml-1" />
//             </button>
//           </div>

//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-600 text-sm">
//                 <th className="pb-4">Subject</th>
//                 <th className="pb-4">Marks</th>
//                 <th className="pb-4">Lower</th>
//                 <th className="pb-4">Upper</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm">
//               {["English", "Maths", "Science", "Socials", "Hindi", "ECA"].map(
//                 (subject) => (
//                   <tr key={subject} className="border-t">
//                     <td className="py-3">{subject}</td>
//                     <td className="py-3">Marks</td>
//                     <td className="py-3">96</td>
//                     <td className="py-3">Upper</td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>

//           <button className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-md flex items-center">
//             <Download className="w-4 h-4 mr-2" />
//             Download Marksheet
//           </button>
//         </div>

//         {/* Final Score */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-lg p-6 shadow-sm text-center">
//             <div className="relative inline-block flex items-center">
//               <div className="w-32 h-32 rounded-full border-8 border-orange-500 flex items-center justify-center">
//                 <div>
//                   <div className="text-3xl font-bold">82%</div>
//                 </div>
//               </div>
//               <div className="text-5xl font-bold text-gray-800">B</div>
//             </div>
//             <p className="text-sm text-gray-600 mt-4">
//               Student overall performance in subjects and class activities
//             </p>
//           </div>

//           {/* Activities and Conduct */}
//           <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-blue-200">
//             <h2 className="font-semibold mb-4">Activities and Conduct</h2>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>A</span>
//                   <span>91% (Average)</span>
//                 </div>
//                 <div className="h-2 bg-blue-100 rounded-full">
//                   <div className="h-full w-[91%] bg-blue-500 rounded-full"></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>B</span>
//                   <span>81% (Average)</span>
//                 </div>
//                 <div className="h-2 bg-blue-100 rounded-full">
//                   <div className="h-full w-[81%] bg-blue-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Grades Distribution */}
//       <div className="bg-white rounded-lg p-6 shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">Grades</h2>
//         <div className="grid grid-cols-3 gap-4 text-center">
//           {[{ grade: "A+", count: 2 }, { grade: "B", count: 1 }, { grade: "B+", count: 4 }].map(({ grade, count }) => (
//             <div key={grade} className="p-4 rounded-lg bg-gray-50">
//               <div className="text-xl font-semibold">{grade}</div>
//               <div className="text-gray-600">{count}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Grading Scale */}
//       <div className="bg-emerald-200 rounded-lg p-6">
//         <h2 className="text-lg font-semibold mb-4">Grading Scale</h2>
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-sm">
//           {[
//             { grade: "A+", range: "100-96" },
//             { grade: "A", range: "95-91" },
//             { grade: "B+", range: "90-86" },
//             { grade: "B", range: "85-81" },
//             { grade: "C+", range: "80-76" },
//             { grade: "C", range: "75-71" },
//           ].map(({ grade, range }) => (
//             <div key={grade}>
//               <div className="font-semibold">{grade}</div>
//               <div>{range}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
//   };
  
  
// export default ReportCardPage;
