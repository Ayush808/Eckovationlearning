import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { getCourses, getAllCategories, getFilteredCourses } from './coursesApi'
import CardView from './CardView'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox'
import prices from './PricesFilterOption'


const Home = () => {

    const [myFilters, setFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(3)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const init = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        //console.log("SHOP: ", filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy == 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setFilters(newFilters)
    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredCourses(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = (newFilters) => {
        // console.log(newFilters)
        let toSkip = skip + limit

        getFilteredCourses(toSkip, limit, newFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }



    const frontImage = () => (
        <div className="coursesfront">
        </div>
    )

    return (
        <div>
            <NavBar />
            {frontImage()}
            <h1 className="mb-4 text-center jumbotron">Courses</h1>
            <div className="row">
                <div className="col-sm-3">
                    <div className="jumbotron">
                        <h4 style={{ fontFamily: "cursive" }}><b>Filter by category</b></h4>
                        <ul>
                            <Checkbox categories={categories}
                                handleFilters={filters => {
                                    return (
                                        handleFilters(filters, 'category')
                                    )
                                }} />
                        </ul>
                    </div>
                    <div className="jumbotron">
                        <h4 style={{ fontFamily: "cursive" }}><b>Filter by price Range</b></h4>
                        <ul>
                            <Radiobox prices={prices}
                                handleFilters={filters => {
                                    return (
                                        handleFilters(filters, 'price')
                                    )
                                }} />
                        </ul>
                    </div>

                </div>
                <div className="col-9">
                    <div className="row">
                        {filteredResults.map((course, i) => (
                            <div style={{ margin: "auto" }}>
                                <CardView key={i} course={course} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home