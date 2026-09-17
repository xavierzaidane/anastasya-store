import Header from "@/components/ui/curved-menu";

const DemoOne = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="text-white h-screen text-7xl text-center flex justify-center items-center">
        hello<span className="italic">!</span>
      </div>
    </div>
  );
};

export { DemoOne };
export default DemoOne;

