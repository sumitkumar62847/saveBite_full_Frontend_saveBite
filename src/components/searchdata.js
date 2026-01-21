import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Restaurent from './Restaurent';
import Header from './header';
import Searchites from './searchitems';
import { getSearchitems } from '../Slices/searchSlice';
import Item from './Item';
import Loader from './Loader';

function Searchdata() {
    const dispatch = useDispatch();
    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
    const Data = useSelector((state) => state.search.searchData);
    const isLoader = useSelector((state) => state.search.isLoader);
    const searchFor = Data?.search;
    const searchData = Data?.data;

    // State to handle responsive grid columns (Tailwind sm, lg, xl simulation)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Logic to determine grid columns based on width
    const getGridColumns = () => {
        if (windowWidth >= 1280) return 'repeat(5, minmax(0, 1fr))'; // xl
        if (windowWidth >= 1024) return 'repeat(4, minmax(0, 1fr))'; // lg
        if (windowWidth >= 640) return 'repeat(3, minmax(0, 1fr))';  // sm
        return 'repeat(2, minmax(0, 1fr))';                         // default
    };

    useEffect(() => {
        if (!searchData) {
            const querySearch = localStorage.getItem('querySearch');
            const querySuggest = localStorage.getItem('querySuggest');
            dispatch(getSearchitems({ search: querySearch, suggested: querySuggest }));
        }
    }, [dispatch, searchData]);

    const commonPageStyle = {
        width: '100%',
        backgroundColor: '#f8fafc', // bg-slate-50
        minHeight: '100vh',
    };

    const gridContainerStyle = {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'grid',
        gridTemplateColumns: getGridColumns(),
        gap: '10px',
        justifyContent: 'center',
        marginTop: '1.25rem',
        marginBottom: '1.25rem',
    };

    return (
        <div style={commonPageStyle}>
            {searchFor === 'item' && (
                <div style={commonPageStyle}>
                    <Header search={true} islogin={!isRegistered} />
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        {searchData?.map((rest, index) => (
                            <Searchites key={index} restinfo={rest} />
                        ))}
                    </div>
                </div>
            )}

            {searchFor === 'ai' && (
                <div style={commonPageStyle}>
                    <Header search={true} islogin={!isRegistered} />
                    
                    {/* Note: Kept 'lenght' as per your original code to avoid logic changes */}
                    {searchData?.data?.highMatch?.lenght !== 0 && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            <h1 style={{ width: '100%', textAlign: 'center' }}>highMatch</h1>
                            <div style={gridContainerStyle}>
                                {searchData?.data?.highMatch?.map((item, index) => (
                                    <Item key={index} iteminfo={item} />
                                ))}
                            </div>
                        </div>
                    )}

                    {searchData?.data?.mediumMatch?.lenght !== 0 && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            <h1 style={{ width: '100%', textAlign: 'center' }}>mediumMatch</h1>
                            <div style={gridContainerStyle}>
                                {searchData?.data?.mediumMatch?.map((item, index) => (
                                    <Item key={index} iteminfo={item} />
                                ))}
                            </div>
                        </div>
                    )}

                    {searchData?.data?.lowMatch?.lenght !== 0 && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            <h1 style={{ width: '100%', textAlign: 'center' }}>lowMatch</h1>
                            <div style={gridContainerStyle}>
                                {searchData?.data?.lowMatch?.map((item, index) => (
                                    <Item key={index} iteminfo={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {searchFor === 'rest' && (
                <div
                    style={{
                        ...commonPageStyle,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Header search={true} islogin={!isRegistered} />
                    <div
                        style={{
                            width: '95%',
                            height: 'auto',
                            backgroundColor: '#f8fafc',
                            borderRadius: '1rem', // rounded-2xl
                            marginTop: '1.25rem',
                            marginBottom: '1.25rem',
                        }}
                    >
                        {searchData?.map((rest, index) => (
                            <Restaurent key={index} restinfo={rest} />
                        ))}
                    </div>
                </div>
            )}

            {isLoader && (
                <div>
                    <Header search={true} islogin={!isRegistered} />
                    <Loader searchByAi={true} />
                </div>
            )}
        </div>
    );
}

export default Searchdata;