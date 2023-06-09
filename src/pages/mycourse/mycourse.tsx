import React, { useState } from 'react';
import CourseInfo from './courseInfo.tsx';
import CourseDetail from './courseDetail.tsx';
import CheckAllSignin from './checkAllSignin.tsx';
import SigninDetail from './signinDetail.tsx';

const MyCourse = () => {

    const [status, setStatus] = useState<number>(0);
    const [courseId, setCourseId] = useState<string>('');
    const [rollcallrecordid, setrollcallrecordid] = useState<number>(0);

    const renderRightComponent = () => {
        if (status==0) {
          return <CourseInfo setCourseId={setCourseId} setStatus={setStatus} />
        } else if (status==1) {
            return <CourseDetail courseId={courseId} setStatus={setStatus}/>
        } else if (status==2) {
        return <CheckAllSignin courseId={courseId} setStatus={setStatus} setrollcallrecordid={setrollcallrecordid}/>
        } else if (status==3) {
            return <SigninDetail rcrecordId={582} setStatus={setStatus} rollcallrecordid={rollcallrecordid}/>
        }
    }

    return(
        <div>{renderRightComponent()}</div>
    )
}

export default MyCourse;