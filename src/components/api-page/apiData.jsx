"use client";

import React from "react";
import ContentBlock from "@/components/ui/content-block";
import { printJson } from "@/utils/methods";

export const SiteData = {
  navigation: [
    {
      sort: 1,
      collapsable: false,
      href: "getting-started",
      title: "Getting started",
      content: {
        main: (
          <>
            <b>Overview</b>
            <p>
              Our API offers robust anti-spoofing solutions for various
              modalities such as face, voice, and fingerprint detection. These
              APIs provide advanced security by ensuring that the input data is
              legitimate and not a spoof attempt.
            </p>
            <br />
            <b>Feedback</b>
            <p>
              Your feedback is crucial for enhancing our developer experience.
              Please reach out with any questions, comments, or suggestions for
              our API.
            </p>
          </>
        ),
      },
    },
    {
      sort: 2,
      collapsable: true,
      href: "anti-spoofing",
      title: "Anti-Spoofing APIs",
      children: [
        {
          sort: 1,
          href: "api-voice",
          collapseable: true,
          title: "Voice Anti-Spoofing",
          method: "post",
          content: {
            main: (
              <>
                <ContentBlock
                  endpoint={
                    "https://abdullahsajid-antispoofing-test.hf.space/api/voice"
                  }
                  description={
                    <>
                      Use this endpoint to verify the authenticity of a voice
                      sample. The API supports both binary and multi-class
                      classification modes.
                    </>
                  }
                  parameters={[
                    {
                      item: "binary",
                      required: false,
                      type: "boolean",
                      description:
                        "Set to 'true' for binary classification mode; defaults to 'false'.",
                    },
                    {
                      item: "base64",
                      required: true,
                      type: "string",
                      description: "Base64 encoded audio data.",
                    },
                  ]}
                  responses={[
                    {
                      color: "green",
                      status: "201",
                      description: "Voice sample successfully processed.",
                    },
                    {
                      color: "yellow",
                      status: "400",
                      description: "Invalid input. No base64 data provided.",
                    },
                    {
                      color: "red",
                      status: "500",
                      description: "An internal server error occurred.",
                    },
                  ]}
                />
              </>
            ),
            mainCode: [
              {
                title: "Body:",
                content: (
                  <>
                    {printJson({
                      base64: "base64-audio-string",
                      binary: false,
                    })}
                  </>
                ),
              },

              {
                title: "201 Response:",
                content: (
                  <>
                    {printJson({
                      Status: 201,
                      message: "Data received!",
                      class: "Genuine",
                      mode: "multi",
                      probs: {
                        Genuine: 95.3,
                        Spoof: 4.7,
                      },
                    })}
                  </>
                ),
              },
            ],
          },
        },
        {
          sort: 2,
          href: "api-face",
          collapseable: true,
          title: "Face Anti-Spoofing",
          method: "post",
          content: {
            main: (
              <>
                <ContentBlock
                  endpoint={
                    "https://abdullahsajid-antispoofing-test.hf.space/api/face"
                  }
                  description={
                    <>
                      Use this endpoint to verify the authenticity of a face
                      image. The API supports both binary and multi-class
                      classification modes, and allows selecting different
                      models like ConvNext or Transformer.
                    </>
                  }
                  parameters={[
                    {
                      item: "binary",
                      required: false,
                      type: "boolean",
                      description:
                        "Set to 'true' for binary classification mode; defaults to 'false'.",
                    },
                    {
                      item: "model",
                      required: false,
                      type: "string",
                      description:
                        "Specify the model to use ('convnext' or 'transformer'). Defaults to 'convnext'.",
                    },
                    {
                      item: "base64",
                      required: true,
                      type: "string",
                      description: "Base64 encoded image data.",
                    },
                  ]}
                  responses={[
                    {
                      color: "green",
                      status: "201",
                      description: "Face image successfully processed.",
                    },
                    {
                      color: "yellow",
                      status: "400",
                      description: "Invalid input. No base64 data provided.",
                    },
                    {
                      color: "red",
                      status: "500",
                      description: "An internal server error occurred.",
                    },
                  ]}
                />
              </>
            ),
            mainCode: [
              {
                title: "Body:",
                content: (
                  <>
                    {printJson({
                      base64: "base64-image-string",
                      binary: false,
                      model: "convnext",
                    })}
                  </>
                ),
              },

              {
                title: "201 Response:",
                content: (
                  <>
                    {printJson({
                      Status: 201,
                      message: "Data received!",
                      class: "Genuine",
                      model: "convnext",
                      mode: "multi",
                      bbox: [100, 50, 200, 150],
                      probs: {
                        Genuine: 98.2,
                        Spoof: 1.8,
                      },
                    })}
                  </>
                ),
              },
            ],
          },
        },
        {
          sort: 3,
          href: "api-fingerprint",
          collapseable: true,
          title: "Fingerprint Anti-Spoofing",
          method: "post",
          content: {
            main: (
              <>
                <ContentBlock
                  endpoint={
                    "https://abdullahsajid-antispoofing-test.hf.space/api/fingerprint"
                  }
                  description={
                    <>
                      Use this endpoint to verify the authenticity of a
                      fingerprint image. This API currently supports binary
                      classification.
                    </>
                  }
                  parameters={[
                    {
                      item: "base64",
                      required: true,
                      type: "string",
                      description: "Base64 encoded image data.",
                    },
                  ]}
                  responses={[
                    {
                      color: "green",
                      status: "201",
                      description: "Fingerprint image successfully processed.",
                    },
                    {
                      color: "yellow",
                      status: "400",
                      description: "Invalid input. No base64 data provided.",
                    },
                    {
                      color: "red",
                      status: "500",
                      description: "An internal server error occurred.",
                    },
                  ]}
                />
              </>
            ),
            mainCode: [
              {
                title: "Body:",
                content: (
                  <>
                    {printJson({
                      base64: "base64-image-string",
                    })}
                  </>
                ),
              },

              {
                title: "201 Response:",
                content: (
                  <>
                    {printJson({
                      Status: 201,
                      message: "Data received!",
                      class: "Genuine",
                      probs: {
                        Genuine: 97.6,
                        Spoof: 2.4,
                      },
                    })}
                  </>
                ),
              },
            ],
          },
        },
      ],
    },
  ],
};
