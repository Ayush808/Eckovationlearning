require('dotenv').config()

export const getCourses = (sortBy) => {
    return fetch(`${process.env.REACT_APP_API_URL}/courses?sortBy=${sortBy}&limit=4`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getAllCategories = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


export const read = courseId => {
    return fetch(`${process.env.REACT_APP_API_URL}/course/${courseId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const listRelated = productId => {
    return fetch(`${process.env.REACT_APP_API_URL}/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getFilteredCourses = (skip, limit, filters = {}) => {

    const data = {
        limit, skip, filters
    }

    return fetch(`${process.env.REACT_APP_API_URL}/courses/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    })
        .catch(err => {
            console.log(err)
        })
}

export const enrollUser = (token, userId, courseId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/enroll/${courseId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getUserEnrolledCourseIds = (token, userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/courseids/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getUserEnrolledCourses = (token, userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/courses/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

