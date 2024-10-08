import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axiosInstance from '../../../../../axiosInstance'; // Import axios for making API calls
import './Widget3.scss';

const Studentperformationchart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [performanceData, setPerformanceData] = useState([]); // State to hold performance data

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const response = await axiosInstance.get('/quizperformance/getStudentperformancedetails'); // Adjust the endpoint accordingly
                setPerformanceData(response.data); // Set the performance data in state
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };

        fetchPerformanceData();
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
      if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
  
          // Destroy existing chart if it exists
          if (chartInstance.current) {
              chartInstance.current.destroy();
          }
  
          // Prepare data and labels from performanceData
          const labels = performanceData.map(subject => subject.name);
          const dataScores = performanceData.map(subject => subject.score);
  
          // Create new chart
          chartInstance.current = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: [{
                      label: 'Scores',
                      data: dataScores,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                  }]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                      y: {
                          beginAtZero: true,
                          min: 0,  // Set minimum value for Y-axis
                          max: 100, // Set maximum value for Y-axis
                          ticks: {
                              stepSize: 10, // Set the gap between ticks
                              callback: function(value) {
                                  return value; // Display exact values
                              },
                              // Setting fixed tick values
                              callback: function(value) {
                                  return value % 10 === 0 ? value : null; // Show only multiples of 10
                              },
                          },
                          title: {
                              display: true,
                              text: 'Score'
                          }
                      },
                      x: {
                          title: {
                              display: true,
                              text: 'Subjects'
                          }
                      }
                  }
              }
          });
      }
  
      // Cleanup function
      return () => {
          if (chartInstance.current) {
              chartInstance.current.destroy();
          }
      };
  }, [performanceData]); // Update chart whenever performanceData changes
  
  

    return (
        <div className="Studentperformationchart">
            <h3>Quiz Performance Summary</h3>
            <div className="chart-container">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}

export default Studentperformationchart;
