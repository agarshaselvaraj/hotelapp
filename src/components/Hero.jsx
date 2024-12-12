import tree from "../assets/tree.jpg";

export const Hero = () => {
  return (
    <div className="h-64 sm:h-80 md:h-96 lg:h-112 overflow-hidden relative">
      {/* Image */}
      <img
        src={tree}
        alt="tree"
        className="w-full h-full filter contrast-110 brightness-105 object-cover"
      />
      
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold italic bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            <span>Find Your Next</span>
            <br />
            <span className="text-4xl sm:text-3xl md:text-6xl mt-4">Stay</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
