import photo1 from "../../public/photos/about1.jpg";
import photo2 from "../../public/photos/about2.jpg";
import photo3 from "../../public/photos/about3.jpg";
import Image from "next/image";

export function AboutSection() {
    return (
        <div id="about"
            className="flex flex-col lg:flex-row gap-4 2xl:gap-12 justify-center pt-32 2xl:pt-48 mx-4 md:mx-12 2xl:mx-64">
            <div className="lg:w-[45%]">
                <h1 className="text-4xl md:text-5xl font-semibold text-gray-50">about section header</h1>
                <p className="mt-2 lg:mt-4 text-xl md:text-2xl font-medium leading-relaxed text-gray-100">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid blanditiis corporis
                    culpa cum distinctio doloremque dolores ducimus earum eum explicabo facilis impedit itaque iusto
                    laboriosam minima nihil nobis obcaecati quae quam quas quod recusandae repudiandae saepe,
                    tenetur? Culpa doloremque eveniet ipsum odit quibusdam rem tempore? Ducimus minus reiciendis
                    tenetur.
                </p>
            </div>
            <div className="lg:w-[55%] flex flex-col lg:flex-row items-center gap-4">
                <div className="flex justify-center lg:justify-end lg:h-full 2xl:h-[120%] items-center">
                    <Image src={photo1} alt="todo later"
                        className="w-[80%] lg:w-auto object-cover h-[80%]" />
                </div>
                <div className="flex flex-row lg:flex-col gap-4 lg:h-full 2xl:h-[150%]">
                    <Image src={photo2} alt="todo later"
                        className="lg:w-auto object-cover w-[50%] lg:h-[200%]" />
                    <Image src={photo3} alt="todo later"
                        className="w-[80%]" />
                </div>
            </div>
        </div>
    );
}