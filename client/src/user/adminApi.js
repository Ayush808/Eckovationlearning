require('dotenv').config()

export const createCourse = (userId, token, course) => {
    return fetch(`${process.env.REACT_APP_API_URL}/course/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: course // form data bcz content type is form
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const addCourseDetails = (courseId, userId, token, details) => {
    return fetch(`${process.env.REACT_APP_API_URL}/course/addmore/${userId}/${courseId}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const getSingleCourseJustAdded = (sortBy) => {
    return fetch(`${process.env.REACT_APP_API_URL}/courses?sortBy=${sortBy}&limit=1`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}