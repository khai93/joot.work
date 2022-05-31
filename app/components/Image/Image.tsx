// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

export const Image = chakra(NextImage, {
    baseStyle: { maxH: 120, maxW: 120 },
    shouldForwardProp: (prop) =>
      [
        "width",
        "height",
        "src",
        "alt",
        "quality",
        "placeholder",
        "blurDataURL",
        "loader ",
      ].includes(prop),
  });