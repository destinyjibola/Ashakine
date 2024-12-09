const dashboardOverview = async (userId: string | undefined) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/${userId}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
};

export default dashboardOverview