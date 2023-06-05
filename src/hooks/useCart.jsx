
import { useQuery } from '@tanstack/react-query'

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const useCart = () => {
    const { user , loading } = useAuth()

    const token = localStorage.getItem('access-token')
    // console.log(token)

    const [axiosSecure] = useAxiosSecure()

    const { isLoading, refetch, data: cart = [] } = useQuery({


        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            return res.data

        },
    })


    // queryKey: ['carts', user?.email],
    //     enabled : !!user?.email,
    //         queryFn: async () => {

    //             const res = await fetch(`https://bistro-boss-server-livid.vercel.app/carts?email=${user?.email}`, {
    //                 headers: {

    //                     authorization: `bearar ${token}`
    //                 }
    //             })
    //             return res.json()


    //         },
    // })



return [cart, refetch]


}

export default useCart;














// --------------

// queryFn: async () => {
//     const res = await axiosSecure(`/carts?email=${user?.email}`)
//     console.log('res from axios', res)
//     return res.data;
// },
// })





// ----------------

