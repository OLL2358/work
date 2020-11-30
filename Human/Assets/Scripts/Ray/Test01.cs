using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

public class Test01 : MonoBehaviour
{
    [MenuItem("Tools/MyTool/ResetPivot")]
    static void ResetPivot()
    {
        //获取选中的物体
        GameObject target = Selection.activeGameObject;
        string dialogTitle = "Tools/MyTool/ResetPivot";

        if (target == null)
        {
            EditorUtility.DisplayDialog(dialogTitle, "没有选中需要重置轴心的物体!!!", "确定");
            return;
        }

        //获取目标物体下所有网格渲染
        MeshRenderer[] meshRenderers = target.GetComponentsInChildren<MeshRenderer>(true);
        if (meshRenderers.Length == 0)
        {
            EditorUtility.DisplayDialog(dialogTitle, "选中的物体不是有效模型物体!!!", "确定");
            return;
        }
        //将所有的网格渲染的边界进行合并
        Bounds centerBounds = meshRenderers[0].bounds;
        for (int i = 1; i < meshRenderers.Length; i++)
        {
            centerBounds.Encapsulate(meshRenderers[i].bounds);
        }
        //创建目标的父物体
        Transform targetParent = new GameObject("-Parent").transform;

        //如果目标原来已有父物体,则将创建目标父物体的父物体设为原父物体;
        Transform originalParent = target.transform.parent;
        if (originalParent != null)
        {
            targetParent.SetParent(originalParent);
        }
        //设置目标父物体的位置为合并后的网格渲染边界中心
        targetParent.position = centerBounds.center;
        //设置目标物体的父物体
        target.transform.parent = targetParent;

        Selection.activeGameObject = targetParent.gameObject;
        EditorUtility.DisplayDialog(dialogTitle, "重置模型物体的轴心完成!", "确定");
    }
    //[MenuItem ("MyMenu/Do Test")]
    static void Test()
    {
        Transform parent = Selection.activeGameObject.transform;
        Vector3 postion = parent.position;
        Quaternion rotation = parent.rotation;
        Vector3 scale = parent.localScale;
        parent.position = Vector3.zero;
        parent.rotation = Quaternion.Euler(Vector3.zero);
        parent.localScale = Vector3.one;


        Vector3 center = Vector3.zero;
        Renderer[] renders = parent.GetComponentsInChildren<Renderer>();
        foreach (Renderer child in renders)
        {
            center += child.bounds.center;
        }
        center /= parent.GetComponentsInChildren<Transform>().Length;
        Bounds bounds = new Bounds(center, Vector3.zero);
        foreach (Renderer child in renders)
        {
            bounds.Encapsulate(child.bounds);
        }

        parent.position = postion;
        parent.rotation = rotation;
        parent.localScale = scale;

        foreach (Transform t in parent)
        {
            t.position = t.position - bounds.center;
        }
        parent.transform.position = bounds.center + parent.position;

    }
}
