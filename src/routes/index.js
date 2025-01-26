import AsyncLoadable from "@/utils/AsyncLoadable";

const ProjectDetail = AsyncLoadable(() =>
import(/* webpackChunkName: 'taskManagement' */ "@/views/ProjectManagement/ProjectDetail")
);

const ProjectManagement = AsyncLoadable(() =>
    import(/* webpackChunkName: 'taskManagement' */ "@/views/ProjectManagement")
);


const routes = [
    {
        path: "/project/projectlist",
        exact: false,
        name: "Device",
        component: ProjectManagement,
        auth: [1]
    },
    {
        path: "/project/project-detail",
        exact: false,
        name: "",
        component: ProjectDetail,
    }
];

export default routes;
