"use client";

const ClassicEleganceTemplate = ({ data, options, uploadedImages }) => {
  const { property_features, property_type_info, contact_info } = data;

  // Apply customization options
  const getBorderRadius = () => {
    switch (options.borderRadius) {
      case "none":
        return "0px";
      case "small":
        return "4px";
      case "medium":
        return "8px";
      case "large":
        return "16px";
      default:
        return "8px";
    }
  };

  const getFontSize = (base) => {
    switch (options.fontSize) {
      case "small":
        return `${base * 0.85}px`;
      case "medium":
        return `${base}px`;
      case "large":
        return `${base * 1.15}px`;
      default:
        return `${base}px`;
    }
  };

  // Generate images based on uploaded images or fallback to placeholders
  const generateImages = () => {
    const images = [];
    const uploadedKeys = Object.keys(uploadedImages);

    // If we have uploaded images, use them
    if (uploadedKeys.length > 0) {
      uploadedKeys.slice(0, options.maxImages).forEach((key) => {
        images.push({ src: uploadedImages[key], alt: key });
      });
    } else {
      // Fallback to placeholders if no images were uploaded
      const { image_requirements } = data;
      let count = 0;

      if (image_requirements.Exterior && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Exterior",
        });
        count++;
      }

      if (image_requirements["Living room"] && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Living Room",
        });
        count++;
      }

      if (image_requirements.Kitchen && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Kitchen",
        });
        count++;
      }

      if (image_requirements.Bedrooms && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Bedroom",
        });
        count++;
      }
    }

    return images;
  };

  const images = generateImages();

  return (
    <div
      style={{
        fontFamily: options.fontFamily,
        backgroundColor: options.backgroundColor,
        color: "#333",
        padding: "2rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Elegant header with decorative elements */}
      <div className="text-center mb-6">
        <div
          style={{
            fontSize: getFontSize(12),
            letterSpacing: "2px",
            color: options.secondaryColor,
            marginBottom: "0.5rem",
          }}
        >
          EXCLUSIVE PROPERTY
        </div>
        <h1
          style={{
            fontSize: getFontSize(32),
            fontWeight: "bold",
            color: options.primaryColor,
            marginBottom: "0.5rem",
            borderBottom: `1px solid ${options.secondaryColor}`,
            paddingBottom: "0.5rem",
          }}
        >
          {property_features["Property type"]}
        </h1>

        {options.showPrice && (
          <div
            style={{
              fontSize: getFontSize(24),
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            {property_features.Price}
          </div>
        )}
      </div>

      {/* Main image */}
      {images.length > 0 && (
        <div
          className="mb-6"
          style={{
            borderRadius: getBorderRadius(),
            overflow: "hidden",
            border: `4px solid ${options.backgroundColor}`,
            boxShadow: `0 0 0 1px ${options.secondaryColor}`,
          }}
        >
          <img
            src={images[0].src || "/placeholder.svg"}
            alt={images[0].alt}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Property details */}
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div>
          <h2
            style={{
              fontSize: getFontSize(20),
              fontWeight: "bold",
              marginBottom: "1rem",
              color: options.primaryColor,
              borderBottom: `1px solid ${options.secondaryColor}`,
              paddingBottom: "0.5rem",
            }}
          >
            Property Details
          </h2>

          <div className="space-y-2" style={{ fontSize: getFontSize(16) }}>
            <div className="flex justify-between">
              <span style={{ fontWeight: "bold" }}>Bedrooms:</span>
              <span>{property_features["Number of bedrooms"]}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontWeight: "bold" }}>Bathrooms:</span>
              <span>{property_features["Number of bathrooms"]}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontWeight: "bold" }}>Square Footage:</span>
              <span>{property_features["Square footage"]}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontWeight: "bold" }}>Year Built:</span>
              <span>{property_features["Year built"]}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontWeight: "bold" }}>Lot Size:</span>
              <span>{property_features["Lot size"]}</span>
            </div>
          </div>

          {/* Secondary images */}
          {images.length > 1 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {images.slice(1, 3).map((image, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: getBorderRadius(),
                    overflow: "hidden",
                    border: `2px solid ${options.backgroundColor}`,
                    boxShadow: `0 0 0 1px ${options.secondaryColor}`,
                  }}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2
            style={{
              fontSize: getFontSize(20),
              fontWeight: "bold",
              marginBottom: "1rem",
              color: options.primaryColor,
              borderBottom: `1px solid ${options.secondaryColor}`,
              paddingBottom: "0.5rem",
            }}
          >
            Description
          </h2>

          <p
            style={{
              fontSize: getFontSize(16),
              lineHeight: "1.6",
              marginBottom: "1rem",
            }}
          >
            {property_type_info.property_description}
          </p>

          <h3
            style={{
              fontSize: getFontSize(18),
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "0.5rem",
              color: options.primaryColor,
            }}
          >
            Amenities
          </h3>

          <ul
            className="grid grid-cols-1 gap-1"
            style={{ fontSize: getFontSize(14) }}
          >
            {property_features.Amenities &&
              property_features.Amenities.slice(0, 5).map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className="mr-2"
                    style={{ color: options.secondaryColor }}
                  >
                    ✦
                  </span>
                  {amenity}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Footer with contact info */}
      {options.showContact && (
        <div
          style={{
            marginTop: "2rem",
            borderTop: `1px solid ${options.secondaryColor}`,
            paddingTop: "1rem",
            fontSize: getFontSize(14),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold", color: options.primaryColor }}>
              {contact_info["Real estate company name"]}
            </div>
            <div>{contact_info["Contact person's name"]}</div>
          </div>
          <div className="text-right">
            <div>{contact_info["Phone number"]}</div>
            <div>{contact_info["Email address"]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicEleganceTemplate;
