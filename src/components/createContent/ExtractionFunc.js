function extractChaptersAndModules(text) {
    // Split the text by double newlines (to separate chapters/modules) and trim empty spaces
    const sections = text.split('\n\n').filter(section => section.trim());
  
    let extractedData = [];
    let currentChapter = { "Modules": [] };
  
    sections.forEach(section => {
      if (section.startsWith("Chapter")) {
        // If there's already a chapter being processed, push it to the result array
        if (currentChapter["Modules"].length > 0) {
          extractedData.push(currentChapter);
        }
  
        // Start a new chapter
        const chapterTitle = section.split(":")[1].trim();
        currentChapter = { "Chapter": chapterTitle, "Modules": [] };
      } else if (section.startsWith("Module")) {
        // Extract the module title and explanation
        const [moduleHeader, ...explanationLines] = section.split('\n');
        const moduleTitle = moduleHeader.split(":")[1].trim();
        const explanation = explanationLines.join('\n').trim();
        
        // Add the module to the current chapter
        currentChapter["Modules"].push({
          "Name": moduleTitle,
          "Explaination": explanation
        });
      }
    });
  
    // Push the last chapter after the loop ends
    if (currentChapter["Modules"].length > 0) {
      extractedData.push(currentChapter);
    }
  
    return extractedData;
  }
  
  
  
  const inputText=`Chapter 1: Introduction to Light\n\nModule 1: The Nature of Light\nLight is a form of electromagnetic radiation that is visible to the human eye. It travels in waves, with properties of both particles and waves. This dual nature of light is known as wave-particle duality. Real-world examples include the colors we see and the rainbow phenomenon. A common misconception is that light only travels in straight lines, but it can also bend around corners in a process known as diffraction.\n\nModule 2: Speed of Light\nThe speed of light in a vacuum is a fundamental constant of nature, approximately 299,792 kilometers per second. It changes when light passes through different mediums, this change in speed leads to a phenomenon called refraction. Practical applications include fiber optic communication systems. A common challenge is understanding that light doesn't slow down in a medium, rather it takes more time due to the interaction with the medium's particles.\n\nModule 3: Electromagnetic Spectrum\nThe electromagnetic spectrum includes all types of electromagnetic radiation, from radio waves to gamma rays. Visible light is just a small portion of this spectrum. Real-world applications include radio and television broadcasting, and medical imaging technologies like X-rays and MRIs. A common misconception is that all electromagnetic waves are visible to the human eye, when in fact, only a small portion is.\n\nChapter 2: Interaction of Light with Matter\n\nModule 1: Reflection\nReflection occurs when light bounces off a surface. The angle of incidence equals the angle of reflection. Practical applications include mirrors and periscopes. A common challenge is understanding the difference between regular and diffuse reflection.\n\nModule 2: Refraction\nRefraction is the bending of light as it passes from one medium to another. It's responsible for phenomena like the apparent bending of a straw in a glass of water. Practical applications include lenses and prisms. A common misconception is that light bends towards the normal in all mediums, but it depends on the optical density of the medium.\n\nModule 3: Diffraction and Interference\nDiffraction is the bending of light around corners, and interference is the interaction of multiple waves. They are responsible for phenomena like rainbow colors and the pattern seen in a soap bubble. Practical applications include holography and the design of optical instruments. A common challenge is understanding the complex wave patterns resulting from interference.\n\nChapter 3: Optics in Everyday Life\n\nModule 1: Lenses\nLenses are used to focus or spread out light, depending on their shape. Practical applications include glasses, cameras, and microscopes. A common challenge is understanding the difference between converging and diverging lenses.\n\nModule 2: Mirrors\nMirrors work on the principle of reflection. They can form images that are real or virtual, erect or inverted, depending on the type of mirror. Practical applications include rearview mirrors and telescopes. A common misconception is that mirrors reverse images left to right, when they actually reverse them front to back.\n\nModule 3: Optical Instruments\nOptical instruments use lenses and mirrors to manipulate light. Examples include microscopes, telescopes, and cameras. A common challenge is understanding the complex optics involved in these instruments.\n\nChapter 4: Advanced Concepts in Optics\n\nModule 1: Polarization\nPolarization is the orientation of the oscillations in a light wave. Practical applications include sunglasses and 3D movies. A common challenge is understanding how polarization filters work.\n\nModule 2: Quantum Optics\nQuantum optics deals with the quantum mechanical properties of light. It's responsible for phenomena like the photoelectric effect and laser operation. A common misconception is that light always behaves as a wave, when it can also behave as a particle.\n\nModule 3: Fiber Optics\nFiber optics use total internal reflection to transmit light over long distances. They are used in telecommunications and medical imaging. A common challenge is understanding how light can travel through a fiber without escaping.`
  
  const extractedData = extractChaptersAndModules(inputText);
  console.log(JSON.stringify(extractedData, null, 2));



// Output of this Input
  [
   {
    "Chapter":"",
    "Modules":[
        {
            "Name":"",
            "Explainantion":""
        },
        {
            "Name":"",
            "Explainantion":""
        },
        {
            "Name":"",
            "Explainantion":""
        }
    ]
   },
   {
   "Chapter":"",
    "Modules":[
        {
            "Name":"",
            "Explainantion":""
        },
        {
            "Name":"",
            "Explainantion":""
        },
        {
            "Name":"",
            "Explainantion":""
        }
    ]
   }
]
