import MaterialTable from "material-table";
import React, { useState } from "react";

import localization from "../config/localization";

export default function Table() {
  const [project, setProject] = useState([]);

  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "名称",
            field: "name",
            render: (rowData) =>
              rowData.link ? (
                <a
                  href={rowData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {rowData.name}
                </a>
              ) : (
                rowData.name
              ),
          },
          { title: "备注", field: "note" },
          { title: "分类", field: "category" },
        ]}
        options={{
          filtering: true,
          grouping: true,
          exportButton: true,
          selection: true,
          sorting: true,
        }}
        title="Powered by"
        data={(query) => {
          return new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_API_URL}/powered_by?`;
            url += `page[size]=${query.pageSize}`;
            url += `&page[number]=${query.page + 1}`;
            if (query.search !== "") {
              url += `&search=${query.search}`;
            }
            if (query.filters.length !== 0) {
              query.filters.forEach((filter) => {
                url += `&filter[${filter.column.field}]=${filter.value}`;
              });
            }

            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.current_page - 1,
                  totalCount: result.total,
                });
              });
          });
        }}
        editable={
          localStorage.userId !== "1"
            ? false
            : {
                onBulkUpdate: (changes) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      /* setData([...data, newData]); */

                      resolve();
                    }, 1000);
                  }),
                onRowUpdateCancelled: (rowData) =>
                  window.console.log("Row editing cancelled"),
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      /* setData([...data, newData]); */

                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...project];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setProject([...dataUpdate]);

                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...project];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setProject([...dataDelete]);

                      resolve();
                    }, 1000);
                  }),
              }
        }
        localization={localization}
      />
      <div>
        <p>
          <a
            href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fgugelong.com%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{ border: 0, width: 88, height: 31 }}
              src={`${process.env.REACT_APP_CDN_URL}/valid-xhtml20.gif`}
              alt="Valid HTML!"
            />
          </a>
          <a
            href="http://jigsaw.w3.org/css-validator/validator?uri=gugelong.com&profile=css3svg&usermedium=all&warning=1&vextwarning="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{ border: 0, width: 88, height: 31 }}
              src={`${process.env.REACT_APP_CDN_URL}/vcss.gif`}
              alt="Valid CSS!"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
