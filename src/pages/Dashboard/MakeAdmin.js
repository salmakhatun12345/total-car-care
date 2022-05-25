import { useQuery } from 'react-query';
import Loading from '../../components/Loading';

const MakeAdmin = () => {

    const { isLoading, error, data, refetch } = useQuery('users', () =>
        fetch('http://localhost:5000/users')
            .then(res => res.json()
            )
    )
    if (isLoading) {
        return <Loading></Loading>
    }

    const handleAdmin = email => {
        fetch(`http://localhost:5000/users/${email}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(result => {
                refetch()
                console.log(result)
            })
    }


    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Job</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((user, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{user.email}</td>
                                <td>{
                                    !user.role && <button onClick={() => handleAdmin(user.email)} className='btn btn-primary'>Make Admin</button>
                                }</td>

                            </tr>
                        )
                    }



                    {/* <!-- row 1 --> */}
                    {/* {users.map((user, index) => <tr>

                        <th>{index + 1}</th>
                        <td>{user.email}</td>
                        <td>Quality Control Specialist</td>

                    </tr>)} */}
                </tbody>
            </table>
        </div>
    );
};

export default MakeAdmin;