import pptxgen from "pptxgenjs";

export const exportPPT = (slides) => {
  const ppt = new pptxgen();
  slides.forEach((slide) => {
    let sld = ppt.addSlide();
    slide.elements.forEach((element) => {
      if (element.type === "textbox") {
        sld.addText(element.text, { x: element.left / 100, y: element.top / 100 });
      }
    });
  });
  ppt.writeFile({ fileName: "presentation.pptx" });
};
