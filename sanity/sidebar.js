import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { DocumentBuilder } from '@sanity/structure/lib/Document';

// Creating custom sidebar
const Sidebar = () => {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Create new sub item
      S.listItem()
        .title(`Home Page`)
        .icon(() => {
          return <strong>🔥</strong>;
        })
        .child(
          S.editor()
            .schemaType('storeSettings')
            // Make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // Add in the rest of our document items
      ...S.documentTypeListItems().filter((item) => {
        return item.getId() !== 'storeSettings';
      }),
    ]);
};

export default Sidebar;
