import React, { useState } from 'react';
import CourseSideBar from './CourseSideBar';

const CourseContent = () => {
    return (
        <div className="flex">
            <div className="w-full relative flex items-start mx-auto py-6 lg:py-8 gap-8">
                <CourseSideBar />
                
            </div>
        </div>
    );
};

export default CourseContent;
