import WheelComponent from "react-wheel-of-prizes";


export default function Roullete({data}) {

    const segColors = [
        "#EE4040",
        "#F0CF50",
        "#815CD1",
        "#3DA5E0",
        "#34A24F",
        "#F9AA1F",
        "#EC3F3F",
        "#FF9000"
      ];
    

    const onFinished = (winner) => {
        console.log(winner);
      };
    

  return (
    <>
      <WheelComponent
        className="wheel"
        segments={data}
        segColors={segColors}
        winningSegment="won 2"
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        size={110}
        upDuration={500}
        downDuration={100}
        fontFamily="Arial"
      />
    </>
  );
}
