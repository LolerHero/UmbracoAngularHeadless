import { getConfig } from './configManager';

const config = getConfig();

const addExpand = (url: string, expand: null) => {
  if (expand) {
    return `${url}expand=property:${expand}&`;
  }

  return url;
};

const addFilter = (url: string, filter: null) => {
  if (filter) {
    return `${url}filter=contentType:${filter}&`;
  }

  return url;
};

const callContentDeliveryAPI = async (url: string | URL | Request) => {
  let items;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'api-key': config.apiKey,
        preview: config.previewEnabled,
      },
    });

    items = response.json();
    console.log(items);
  } catch (e) {
    console.log(e);
  }

  return items;
};

export async function fetchItems(expand: any, filter: any) {
  let url = `${config.domain}/umbraco/delivery/api/v2/content/?`;
  url = addExpand(url, expand);
  url = addFilter(url, filter);

  console.log(url);
  return callContentDeliveryAPI(url);
}

export async function fetchItem(pathOrId: any, expand: any) {
  let url = `${config.domain}/umbraco/delivery/api/v2/content/item/${pathOrId}?`;
  url = addExpand(url, expand);

  console.log(url, config.apiKey, config.previewEnabled);

  return callContentDeliveryAPI(url);
}
