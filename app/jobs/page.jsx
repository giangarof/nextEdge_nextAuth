
import Jobs from "@/components/Jobs";
import connectDB from "@/config/database";

const jobs = async() => {
    await connectDB();
    const jobs = [
        {
            author: "Jhon doe",
            title:"Fullstack developer",
            location:"remote",
            salary: 50000,
            company: 'oracle',
            description:"description template",
            type: "Full time"
        },
        {
            author: "Jhon doe",
            title:"Java developer",
            location:"remote",
            salary: 70000,
            company: 'oracle',
            description:"description template",
            type:"Internship"
        },
        {
            author: "Jhon doe",
            title:"Accountant",
            location:"MS",
            salary: 55000,
            company: 'oracle',
            description:"description template",
            type: "Temporary"
        },
        {
            author: "Jhon doe",
            title:"Fullstack developer",
            location:"Boston",
            salary: 50000,
            company: 'oracle',
            description:"description template",
            type:"Full time"
        },
        {
            author: "Jhon doe",
            title:"sales associate",
            location:"NY",
            salary: 30000,
            company: 'marriot',
            description:"description template",
            type:"remote"
        },
        {
            author: "Jhon doe",
            title:"IT consultant",
            location:"NY",
            salary: 50000,
            company: 'oracle',
            description:"description template",
            type:"Full time"
        },
    ]
    return ( <>
    <main className="min-h-screen bg-gray-50 py-10">

        <Jobs jobs={jobs}/>
    </main>
    </> );
}
 
export default jobs;