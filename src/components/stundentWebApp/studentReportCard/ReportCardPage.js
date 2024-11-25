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
