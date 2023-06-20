import React, { useState } from 'react';
import CourseInfo from './courseInfo.tsx';
import CourseDetail from './courseDetail.tsx';
import CheckAllSignin from './checkAllSignin.tsx';

const MyCourse = () => {

    const [status, setStatus] = useState<number>(0);
    const [courseId, setCourseId] = useState<string>('');

    const renderRightComponent = () => {
        if (status==0) {
          return <CourseInfo setCourseId={setCourseId} setStatus={setStatus} />
        } else if (status==1) {
            return <CourseDetail courseId={courseId} setStatus={setStatus}/>
        } else if (status==2) {
            return <CheckAllSignin courseId={courseId} setStatus={setStatus}/>
        }
    }

    return(
        <div>{renderRightComponent()}</div>
    )
}

export default MyCourse;