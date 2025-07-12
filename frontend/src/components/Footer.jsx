import { Link } from "react-router-dom"
// import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div className="">
                    <Link to='/'><h1 className='text-3xl'>TUMBAS</h1></Link>
                    <p className="w-full md:w-2/3 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus expedita assumenda illum animi eos cupiditate, ipsam cumque dolor, beatae harum, deserunt corrupti ullam? Doloribus exercitationem ducimus quas perspiciatis quae quis?</p>
                </div>

                <div className="">
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="">Home</li>
                        <li className="">About Us</li>
                        <li className="">Delivery</li>
                        <li className="">Privacy Policy</li>
                    </ul>
                </div>

                <div className="">
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="">+62 1122 3344 5566</li>
                        <li className="">tumbasinaja@lokal.com</li>
                    </ul>
                </div>
            </div>

{/* copryrigth */}
            <div>
                <hr />
                <p className="py-5 text-sm">Tumbasinaja | LOKAL PRIDE | Copyright 2025</p>
            </div>
        </div>
    )
}

export default Footer
