import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Topics = () =>
{
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);

    useEffect(() =>
    {
        const fetchTopicData = async () =>
        {
            try
            {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/topic/${topicId}`);
                const data = await response.json();
                console.log("DATA-------------", data);
                setTopic(data?.data);
            } catch (error)
            {
                console.error('Error fetching topic:', error);
            }
        };

        fetchTopicData();
    }, [topicId]);

    const handleCheckboxChange = async (problemId) =>
    {
        try
        {
            // Make the API call to update the problem
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/problem/${problemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: true }),
            });

            if (!response.ok)
            {
                throw new Error('Failed to update problem');
            }

            // Update the local state to reflect the change
            setTopic((prevTopic) =>
            {
                const updatedProblems = prevTopic.problems.map((problem) =>
                    problem._id === problemId ? { ...problem, isCompleted: true } : problem
                );
                return { ...prevTopic, problems: updatedProblems };
            });

            console.log('Problem marked as completed:', problemId);
        } catch (error)
        {
            console.error('Error updating problem:', error);
        }
    };

    console.log("TOPIC------------", topic);

    return (
        <div className="p-4 h-full overflow-y-auto">
            {topic ? (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Chapter: {topic.chapterId?.name}
                    </h1>
                    <p>{topic.chapterId?.content}</p>
                    <br />
                    <h1 className="text-2xl font-bold mb-4">Topic: {topic.name}</h1>
                    <h2 className="text-xl mb-4">Problems:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topic.problems.length > 0 ? (
                            topic.problems.map((problem) => (
                                <div
                                    key={problem._id}
                                    className="bg-white p-4 rounded-lg shadow-md flex flex-col"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{problem.name}</h3>
                                    <div className="space-y-2 mb-2">
                                        <a
                                            href={problem.youtubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-blue-500 hover:underline"
                                        >
                                            YouTube
                                        </a>
                                        <a
                                            href={problem.leetCodeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-blue-500 hover:underline"
                                        >
                                            LeetCode
                                        </a>
                                        <a
                                            href={problem.articleLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-blue-500 hover:underline"
                                        >
                                            Article
                                        </a>
                                    </div>

                                    <hr />
                                    <div className="flex justify-between mt-2 ml-2">
                                        <label className="flex items-center mb-2 mt-2">
                                            <input
                                                type="checkbox"
                                                checked={problem.isCompleted}
                                                onChange={() => handleCheckboxChange(problem._id)}
                                                className="mr-2"
                                            />
                                            Mark as Done
                                        </label>
                                        <p className={`mb-2 p-1 rounded text-white ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p>No problems listed for this topic.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading topic details...</p>
            )}
        </div>
    );
};

// Utility function to get background color based on difficulty
const getDifficultyColor = (difficulty) =>
{
    switch (difficulty)
    {
        case 'Easy':
            return 'bg-green-500';
        case 'Medium':
            return 'bg-orange-500';
        case 'Tough':
            return 'bg-red-500';
        default:
            return 'bg-gray-300';
    }
};

export default Topics;
