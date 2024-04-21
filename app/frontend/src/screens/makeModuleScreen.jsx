import React from "react";

export default function MakeModuleScreen() {


    return (
        <div>
            Make Module
            <form>
                <label>
                    Assignment Name:
                    <input type="text" name="assignmentName" />
                </label>
                <br />
                <label>
                    Assignment Number:
                    <input type="text" name="assignmentNumber" />
                </label>
                <br />
                <label>
                    Lecture Content:
                    <select name="lectureContent">
                        <option value="content1">Content 1</option>
                        <option value="content2">Content 2</option>
                        <option value="content3">Content 3</option>
                    </select>
                </label>
                <br />
                <label>
                    Language:
                    <select name="language">
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </label>
                <br />
                <label>
                    Duration:
                    <input type="text" name="duration" />
                </label>
                <br />
                <label>
                    Lecture Description:
                    <textarea name="lectureDescription"></textarea>
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}