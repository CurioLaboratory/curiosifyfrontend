import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { weeklyData } from './weeklyData';
import './W1.scss'
const WeeklySummaryChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            // Destroy existing chart if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Create new chart
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: weeklyData.map(d => d.day),
                    datasets: [{
                        label: 'Study Hours',
                        data: weeklyData.map(d => d.hours),
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
                            title: {
                                display: true,
                                text: 'Hours'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Day of Week'
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
    }, []);

    return (
        <div className="weekly-summary-chart">
            <h3>Weekly Summary</h3>
            <div className="chart-container">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}

export default WeeklySummaryChart;