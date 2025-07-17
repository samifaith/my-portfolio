import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import WanderlustCaseStudy from "./Wander";
import { Compass, ExternalLink, BookOpen, Headphones, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Create a preview component
const WanderlustPreview = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Handle routing to the case study page
    const openCaseStudy = () => {
        navigate('/wanderlust-case-study');
    };

    return (
        <div
            className="relative bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300"
            style={{ 
                boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onClick={openCaseStudy}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4">
                    <Compass className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-4 left-4">
                    <Compass className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Compass className="w-20 h-20 text-white" />
                </div>
            </div>

            {/* Header */}
            <div className="p-4 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Compass className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Wanderlust</h3>
                        <p className="text-sm text-white text-opacity-90">UX/UI Case Study</p>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 relative z-10">
                <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">
                            Project Overview
                        </h4>
                        <p className="text-sm text-white text-opacity-90">
                            A comprehensive travel planning app designed to simplify trip
                            organization and enhance user experience through intuitive design.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Role</h5>
                            <p className="text-xs text-white text-opacity-90">UX/UI Designer</p>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Duration</h5>
                            <p className="text-xs text-white text-opacity-90">8 weeks</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center z-20">
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            View Case Study
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            )}
        </div>
    );
};

// Create writing preview components
const EatLikeChildPreview = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const openWriting = () => {
        navigate('/writing');
    };

    return (
        <div
            className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300"
            style={{ 
                boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onClick={openWriting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4">
                    <Coffee className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-4 left-4">
                    <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Coffee className="w-20 h-20 text-white" />
                </div>
            </div>

            {/* Header */}
            <div className="p-4 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Eat Like a Child</h3>
                        <p className="text-sm text-white text-opacity-90">Personal Essay</p>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 relative z-10">
                <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">
                            Cultural Heritage & Food
                        </h4>
                        <p className="text-sm text-white text-opacity-90">
                            A nostalgic reflection on Caribbean culture, family traditions, 
                            and the complex relationship between immigrant identity and food.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Type</h5>
                            <p className="text-xs text-white text-opacity-90">Memoir</p>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Theme</h5>
                            <p className="text-xs text-white text-opacity-90">Culture</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center z-20">
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            Read Story
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            )}
        </div>
    );
};

const HomeCookPreview = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const openWriting = () => {
        navigate('/writing');
    };

    return (
        <div
            className="relative bg-gradient-to-br from-amber-700 to-orange-800 rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300"
            style={{ 
                boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onClick={openWriting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4">
                    <Coffee className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-4 left-4">
                    <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Coffee className="w-20 h-20 text-white" />
                </div>
            </div>

            {/* Header */}
            <div className="p-4 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">The Rise of the Home Cook</h3>
                        <p className="text-sm text-white text-opacity-90">Profile Feature</p>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 relative z-10">
                <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">
                            Arielle Faria Profile
                        </h4>
                        <p className="text-sm text-white text-opacity-90">
                            An intimate look at a home chef who transforms family recipes 
                            into culinary magic through intuition and ancestral wisdom.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Type</h5>
                            <p className="text-xs text-white text-opacity-90">Profile</p>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Theme</h5>
                            <p className="text-xs text-white text-opacity-90">Food</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center z-20">
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            Read Profile
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            )}
        </div>
    );
};

const TeaWithSamiPreview = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const openWriting = () => {
        navigate('/writing');
    };

    return (
        <div
            className="relative bg-gradient-to-br from-indigo-700 to-slate-800 rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300"
            style={{ 
                boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onClick={openWriting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4">
                    <Headphones className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-4 left-4">
                    <Coffee className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Headphones className="w-20 h-20 text-white" />
                </div>
            </div>

            {/* Header */}
            <div className="p-4 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Headphones className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Tea with Sami</h3>
                        <p className="text-sm text-white text-opacity-90">Podcast Episode</p>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 relative z-10">
                <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">
                            Revenge Served HOT!
                        </h4>
                        <p className="text-sm text-white text-opacity-90">
                            An intimate conversation exploring relationships, personal growth, 
                            and the stories we tell ourselves about justice and healing.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Type</h5>
                            <p className="text-xs text-white text-opacity-90">Audio</p>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                            <h5 className="font-medium text-white text-sm">Format</h5>
                            <p className="text-xs text-white text-opacity-90">Podcast</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center z-20">
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            Listen Now
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            )}
        </div>
    );
};

// Update your SectionTemplate
export const SectionTemplate = [
    {
        title: "DESIGN",
        content:
            "I have always been an artist, I have just added to the art mediums I'm skillful with. From graphic design to 3D modeling, I love to create. I have a passion for beautiful and functional designs that resonate.",
        boxKeys: [
            "./SD_TypePoster_ROWDY.png",
            "./SD_TypePoster_LOMBARDIA.png",
            "./Vote_Poster.png",
        ],
    },
    {
        title: "DEVELOPMENT",
        content:
            "I fuse logic with artistry to craft immersive digital experiences. Whether building robust front-end applications or experimenting with new technologies, I see every line of code as a chance to bring fresh ideas to life.",
        boxKeys: [
            <WanderlustPreview key="wanderlust-case-study" />,
            "./SamDeCoteau_Vector.png",
        ],
    },
    {
        title: "WRITING",
        content:
            "I want to be Anthony Bourdain without the vices. I want to travel the world sharing the stories and culture of others. We are all the children of a Diaspora. Oftentimes, we have more similarities than differences, yet we focus less on the people and more on our perspectives. I want to write about food, culture, and the people I meet along the way.",
        boxKeys: [
            <EatLikeChildPreview key="eat-like-child" />,
            <HomeCookPreview key="home-cook" />,
            <TeaWithSamiPreview key="tea-sami" />,
        ],
    },
    {
        title: "MEDIA",
        content:
            "I've always loved intimate weddings. I get to spend time with each subject understanding who they are and what's important to them. The impact of a shared emotion or laughter caught in motion. I want the picture to capture the story being told.",
        boxKeys: ["./diving.MP4"],
    },
];
