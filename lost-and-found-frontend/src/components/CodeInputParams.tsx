// OtherDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CodeInput from "./CodeInput";
interface RouteParams {
    code: string
}
export default () => {
    const params = useParams<RouteParams>();
    return (
        <>
            <CodeInput code={params.code?.toString()}/>
        </>
    )
}