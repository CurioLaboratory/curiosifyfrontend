// Simulated API response with prefix
const rawResponse = `### RESPONSE_JSON[{'Chapter 1': 'Introduction to Light and Matter', 
'Module 1 Name': 'The Nature of Light', 
'Module 1 Detailed Explanation': 'Light is a form of electromagnetic radiation that is visible to the human eye. It exhibits both wave-like and particle-like properties, a phenomenon known as wave-particle duality. Light waves can be characterized by their wavelength, frequency, and speed. For example, sunlight is a mixture of light of different wavelengths, which we perceive as different colors. A common misconception is that light only travels in straight lines. However, light can also be bent, reflected, or scattered, depending on the medium it encounters.', 

'Module 2 Name': 'Interaction of Light with Matter', 
'Module 2 Detailed Explanation': 'When light encounters matter, it can be absorbed, reflected, transmitted, or refracted. Absorption occurs when matter takes up the energy of the light wave, often leading to an increase in temperature. Reflection involves light bouncing off a surface, while transmission involves light passing through a material. Refraction is the bending of light as it passes from one medium to another. An everyday example of refraction is the apparent bending of a straw in a glass of water.', 

'Module 3 Name': 'The Electromagnetic Spectrum', 
'Module 3 Detailed Explanation': 'The electromagnetic spectrum is the range of all possible frequencies of electromagnetic radiation, from low-energy radio waves to high-energy gamma rays. Visible light is only a small part of the electromagnetic spectrum. Understanding the electromagnetic spectrum is crucial in many areas of science and technology, including astronomy, medicine, and telecommunications. A common challenge in this topic is visualizing the vastness of the electromagnetic spectrum, as our daily experiences are limited to the narrow band of visible light.'}, 

{'Chapter 2': 'Principles of Optics', 
'Module 1 Name': 'Reflection and Refraction', 
'Module 1 Detailed Explanation': 'Reflection is the process by which light bounces off a surface. The law of reflection states that the angle of incidence is equal to the angle of reflection. Refraction is the bending of light as it passes from one medium to another. The law of refraction, or Snells law, relates the angles of incidence and refraction to the ratio of the speeds of light in the two media. Applications of reflection and refraction can be seen in mirrors and lenses, respectively.', 

'Module 2 Name': 'Diffraction and Interference', 
'Module 2 Detailed Explanation': 'Diffraction is the bending of light around obstacles, resulting in the spreading out of light waves. Interference is the phenomenon where two or more overlapping light waves combine to produce regions of constructive and destructive interference. Diffraction and interference are responsible for many optical phenomena, such as the colorful patterns seen in soap bubbles and oil slicks. These concepts can be challenging to grasp, as they involve the wave nature of light, which is not directly observable.', 

'Module 3 Name': 'Polarization', 
'Module 3 Detailed Explanation': 'Polarization is the process by which the oscillations of a light wave are confined to a certain direction. Unpolarized light consists of waves oscillating in all directions perpendicular to the direction of propagation, while polarized light consists of waves oscillating in one direction. Polarization has many applications, including in sunglasses, 3D movies, and optical communications.'}, 

{'Chapter 3': 'Optical Instruments', 
'Module 1 Name': 'Lenses and Mirrors', 
'Module 1 Detailed Explanation': 'Lenses and mirrors are optical instruments that manipulate light to form images. Lenses refract light to converge or diverge the light rays, while mirrors reflect light. The principles of lenses and mirrors are applied in many devices, including cameras, telescopes, and eyeglasses. A common challenge in understanding lenses and mirrors is visualizing how light rays are bent or reflected to form images.', 

'Module 2 Name': 'Microscopes and Telescopes', 
'Module 2 Detailed Explanation': 'Microscopes and telescopes are optical instruments that magnify objects. Microscopes are used to view small objects, such as cells, while telescopes are used to view distant objects, such as stars. Both microscopes and telescopes use a combination of lenses or mirrors to magnify objects and produce clear images. Understanding how these instruments work can be challenging, as it involves the principles of optics and the properties of light.', 

'Module 3 Name': 'Optical Communications', 
'Module 3 Detailed Explanation': 'Optical communications involve transmitting information using light. This is achieved by modulating the properties of light, such as its intensity, phase, or polarization. Optical communications are used in many technologies, including fiber-optic communications, optical storage devices, and optical sensors. A common misconception is that optical communications only involve visible light. However, other parts of the electromagnetic spectrum, such as infrared and ultraviolet light, can also be used.'}, 

{'Chapter 4': 'Advanced Topics in Optics', 
'Module 1 Name': 'Quantum Optics', 
'Module 1 Detailed Explanation': 'Quantum optics is the study of the quantum mechanical properties of light. It involves concepts such as photons, the particle-like aspects of light, and quantum entanglement, a phenomenon where two or more particles become interconnected. Quantum optics has applications in quantum computing and quantum cryptography. This topic can be challenging, as it involves quantum mechanics, a field of physics that defies everyday intuition.', 

'Module 2 Name': 'Nonlinear Optics', 
'Module 2 Detailed Explanation': 'Nonlinear optics is the study of the interaction of light with matter in which the response of the material is nonlinear. This means that the output is not directly proportional to the input. Nonlinear optics is responsible for many optical phenomena, such as frequency doubling and optical switching. It has applications in laser technology and optical communications.', 

'Module 3 Name': 'Photonics', 
'Module 3 Detailed Explanation': 'Photonics is the science and technology of generating, controlling, and detecting photons, the particles of light. It includes the study of lasers, optical fibers, and photodetectors. Photonics has many applications, including in telecommunications, medicine, and computing. Understanding photonics requires a good grasp of the principles of optics and the quantum mechanical properties of light.'}]`;

// Function to remove prefix
const removePrefix = (response) => {
  const prefixEndIndex = response.indexOf("\n[");
  if (prefixEndIndex === -1) {
    throw new Error("Prefix not found in the response");
  }
  return response.substring(prefixEndIndex + 1).trim();
};

function convertToChapterModuleStructure(data) {
  let result = [];

  data.forEach((chapterData) => {
    let chapterTitle = chapterData[Object.keys(chapterData)[0]]; // Get chapter title
    let modules = [];

    // Dynamically find and process all modules
    Object.keys(chapterData).forEach((key) => {
      if (key.includes("Module") && key.includes("Name")) {
        const moduleNumber = key.match(/\d+/)[0]; // Extract the module number
        const moduleName = chapterData[key];
        const moduleExplanationKey = `Module ${moduleNumber} Detailed Explanation`;

        if (chapterData[moduleExplanationKey]) {
          modules.push({
            Name: moduleName,
            Explaination: chapterData[moduleExplanationKey],
          });
        }
      }
    });

    result.push({
      Chapter: chapterTitle,
      Modules: modules,
    });
  });

  return result;
}
function convertStringToJson(data) {
  // Replace single quotes with double quotes
  let jsonString = data.replace(/'/g, '"'); // Replace single quotes with double quotes
  return jsonString;
}

try {
  // Perform operations
  const cleanedResponse = removePrefix(rawResponse);
  // console.log(cleanedResponse)

  // console.log(jsonObject)
  const jsonString = convertStringToJson(cleanedResponse);

  const jsonData = JSON.parse(jsonString);
  const convertedData = convertToChapterModuleStructure(jsonData);
  console.log(JSON.stringify(convertedData, null, 2));

  //   const parsedData = parseJSON(cleanedResponse);
  //   console.log(parsedData)
  //   const transformedData = transformData(parsedData);
  //   console.log(JSON.stringify(transformedData, null, 2));
} catch (error) {
  console.error("Processing failed:", error.message);
}

[
  {
    "Chapter 1": {
      "Module 1: Principles of Light":
        "Light is a form of electromagnetic radiation that is visible to the human eye. It is characterized by properties such as intensity, frequency, and polarization. Light travels in a straight line and at a constant speed in a vacuum, but its speed can vary in different media. For example, light travels slower in water than in air, which leads to the phenomenon of refraction. This concept is crucial in the design of lenses and optical instruments.",

      "Module 2: Interaction of Light with Matter":
        "When light encounters matter, several interactions can occur, including reflection, refraction, absorption, and scattering. Reflection is the bouncing back of light from a surface, while refraction is the bending of light as it passes from one medium to another. Absorption occurs when matter takes up light energy and converts it into other forms of energy, while scattering is the spreading out of light in different directions. These interactions are fundamental to many optical technologies, such as cameras, microscopes, and telescopes.",

      "Module 3: Challenges and Misconceptions":
        "One common misconception is that light always travels in a straight line. While this is true in a vacuum or uniform medium, light can bend or spread out when it encounters different media or obstacles. Another challenge is understanding the wave-particle duality of light, which is a fundamental concept in quantum mechanics. Light exhibits both wave-like and particle-like properties, depending on the circumstances.",
    },
  },

  {
    "Chapter 2": {
      "Module 1: Reflection and Refraction":
        "Reflection occurs when light bounces off a surface. The angle of incidence, or the angle at which the light hits the surface, is equal to the angle of reflection. Refraction is the bending of light as it passes from one medium to another. The amount of bending depends on the change in speed of light, which is determined by the refractive index of the media. Practical applications of reflection and refraction include mirrors and lenses.",

      "Module 2: Diffraction and Interference":
        "Diffraction is the bending of light around obstacles, while interference is the combination of two or more light waves to produce a resultant wave. These phenomena demonstrate the wave nature of light and are crucial in understanding the behavior of light in various situations. For example, diffraction is used in spectroscopy to analyze the composition of materials, while interference is used in holography to create three-dimensional images.",

      "Module 3: Challenges and Misconceptions":
        "A common challenge in understanding diffraction and interference is visualizing these phenomena, as they often involve complex wave patterns. Misconceptions may arise from the oversimplified diagrams often used to represent these phenomena. For instance, diffraction is often depicted as light bending around a single edge, while in reality, it involves a complex pattern of bright and dark regions.",
    },
  },

  {
    "Chapter 3": {
      "Module 1: Lenses and Mirrors":
        "Lenses and mirrors are optical devices that manipulate light to produce a desired effect. Lenses work by refraction, bending light as it passes through the lens material. This allows lenses to focus or disperse light, forming images that are magnified, reduced, or inverted. Mirrors work by reflection, bouncing light off a polished surface. This allows mirrors to form images that are virtual or real, depending on the mirror's curvature.",

      "Module 2: Optical Instruments":
        "Optical instruments, such as cameras, microscopes, and telescopes, use lenses and mirrors to capture, magnify, or project images. These instruments often combine multiple lenses or mirrors to achieve the desired effect. For example, a microscope uses a combination of lenses to magnify small objects, while a telescope uses mirrors to gather and focus light from distant objects.",

      "Module 3: Challenges and Misconceptions":
        "A common challenge in understanding lenses and mirrors is grasping the principles of image formation. It involves understanding concepts such as focal length, object distance, and image distance. A common misconception is that mirrors always flip images horizontally. In fact, mirrors flip images front-to-back, creating a left-right reversal only from our perspective.",
    },
  },

  {
    "Chapter 4": {
      "Module 1: Real-world Applications of Optics":
        "Optics plays a crucial role in many areas of our lives. In medicine, optics is used in endoscopes for internal examination of the body and in lasers for eye surgery. In communication, fiber optics is used to transmit data over long distances. In entertainment, optics is used in cameras for film and photography, and in projectors for cinema and presentations.",

      "Module 2: Future Trends in Optics":
        "The field of optics continues to evolve with advances in technology. Future trends include quantum optics, which explores the quantum mechanical properties of light, and metamaterials, which are engineered to have optical properties not found in nature. These advances could lead to new technologies such as invisibility cloaks and superlenses that can see beyond the diffraction limit.",

      "Module 3: Challenges and Misconceptions":
        "One challenge in the field of optics is the need for precision. Small errors in the design or manufacturing of optical devices can lead to significant performance issues. A common misconception is that all optical devices work in the same way. In fact, different devices use different principles and techniques, depending on their specific applications.",
    },
  },
];
