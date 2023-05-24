import SectionTitle from "../../../Componentes/SectionTitle/SectionTitle";
import featuedImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed  text-white pt-8 my-20">
            <SectionTitle
                subHeading="Check It Out"
                heading="Featured Item"
            >
            </SectionTitle>
            <div className="md:flex justify-center bg-slate-500  bg-opacity-60 items-center pb-20 pt-12 px-36 ">
                <div>
                    <img src={featuedImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20 , 2029</p>
                    <p className="uppercase">Where Can i get Some ? </p>

<p>                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ullam ex ducimus amet eum saepe obcaecati consectetur perferendis sint modi incidunt, accusamus in inventore numquam. Eum, omnis. Odit non unde, distinctio ab minus possimus officiis impedit, eveniet eaque culpa sint expedita nihil iste sit veniam? Delectus suscipit deserunt corrupti dolores.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 rounded">Order Now</button>
                </div>
            </div>


        </div>
    );
};

export default Featured;