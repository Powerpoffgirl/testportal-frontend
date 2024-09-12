import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = () =>
{
    const [openChapter, setOpenChapter] = useState(null);
    const [chaptersData, setChaptersData] = useState([]);
    const [coveredTopics, setCoveredTopics] = useState({});
    const [counts, setCounts] = useState({
        chapters: 0,
        topics: 0,
        problems: 0,
        completedProblems: 0
    });
    const [userName, setUserName] = useState('');

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const toggleChapter = (chapterId) =>
    {
        setOpenChapter(openChapter === chapterId ? null : chapterId);
    };

    const handleCheckboxChange = (chapterId, topicId) =>
    {
        setCoveredTopics((prev) => ({
            ...prev,
            [chapterId]: {
                ...prev[chapterId],
                [topicId]: !prev[chapterId]?.[topicId],
            },
        }));
    };

    useEffect(() =>
    {
        const fetchChapters = async () =>
        {
            const response = await fetch(`${baseUrl}/api/v1/chapter`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const chapters = data?.data || [];

            // Calculate counts
            const totalChapters = chapters.length;
            const totalTopics = chapters.flatMap(chapter => chapter.topics).length;
            const totalProblems = chapters.flatMap(chapter => chapter.topics.flatMap(topic => topic.problems)).length;
            const completedProblems = chapters.flatMap(chapter => chapter.topics.flatMap(topic => topic.problems)).filter(problem => problem.isCompleted).length;

            setChaptersData(chapters);
            setCounts({
                chapters: totalChapters,
                topics: totalTopics,
                problems: totalProblems,
                completedProblems: completedProblems
            });

            // Create a structure where each chapter holds topic names with false (unchecked)
            const covered = {};
            chapters.forEach((chapter) =>
            {
                covered[chapter._id] = {};
                chapter.topics.forEach((topic) =>
                {
                    covered[chapter._id][topic._id] = false;
                });
            });

            setCoveredTopics(covered);
        };

        const fetchProblems = async () =>
        {
            const response = await fetch(`${baseUrl}/api/v1/problem`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const problems = data?.data || [];

            // Calculate counts for problems
            const totalProblems = problems.length;
            const completedProblems = problems.filter(problem => problem.isCompleted).length;

            setCounts((prev) => ({
                ...prev,
                problems: totalProblems,
                completedProblems: completedProblems
            }));
        };

        const fetchUser = async () =>
        {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/api/v1/student/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setUserName(data?.data?.name || 'User');
        };

        fetchChapters();
        fetchProblems();
        fetchUser();
    }, [baseUrl]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 text-white p-4" style={{ backgroundColor: '#89cff0' }}>
                <h2 className="text-2xl font-bold mb-6">Chapters</h2>
                <nav>
                    <ul>
                        {/* Rendering Chapters and Topics */}
                        {chaptersData.length > 0 ? (
                            chaptersData.map((chapter) => (
                                <li className="mb-4" key={chapter._id}>
                                    <button
                                        className="w-full text-left flex justify-between items-center text-white hover:text-black-300"
                                        onClick={() => toggleChapter(chapter._id)}
                                    >
                                        {chapter.name}
                                        <span className={`ml-2 transform transition-transform ${openChapter === chapter._id ? 'rotate-180' : 'rotate-0'}`}>
                                            ▼
                                        </span>
                                    </button>
                                    {openChapter === chapter._id && (
                                        <ul className="ml-4 mt-2 space-y-2">
                                            {chapter.topics.map((topic) => (
                                                <li key={topic._id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={coveredTopics[chapter._id]?.[topic._id] || false}
                                                        onChange={() => handleCheckboxChange(chapter._id, topic._id)}
                                                        className="form-checkbox"
                                                    />
                                                    <Link
                                                        to={`/dashboard/${chapter.name}/${topic.name}/${topic._id}`}
                                                        className="text-white hover:text-black-300"
                                                    >
                                                        {topic.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>No chapters available</p>
                        )}
                        <li className="mt-auto">
                            <button className="w-full bg-black p-2 rounded-md" onClick={() => navigate('/')}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-4">Welcome {userName}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card title="Total Chapters" value={counts.chapters} />
                        <Card title="Total Topics" value={counts.topics} />
                        <Card title="Total Problems" value={counts.problems} />
                        <Card title="Completed Problems" value={counts.completedProblems} />
                    </div>
                </div>
                <Outlet />
            </main>
        </div>
    );
};

// Card Component with Donut Chart
const Card = ({ title, value }) =>
{
    const chartData = {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            data: [value, 100 - value], // Example data; adjust as needed
            backgroundColor: ['#4caf50', '#e0e0e0'], // Colors for completed and remaining
        }],
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-2xl font-bold mb-2">{value}</p>
            <Doughnut data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
    );
};

export default Dashboard;
