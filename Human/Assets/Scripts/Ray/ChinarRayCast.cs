using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChinarRayCast : MonoBehaviour
{
    public Transform Ball; //小球(用来标记坐标)

    //设置射线在Plane上的目标点target
    private Vector3 target;
    void Update()
    {
        //OnTrig();
        Raycode();
    }
    public void Raycode()
    {
        if (Input.GetMouseButton(1)) //点击鼠标右键
        {
            object ray = Camera.main.ScreenPointToRay(Input.mousePosition); //屏幕坐标转射线
            RaycastHit hit;                                                     //射线对象是：结构体类型（存储了相关信息）
            bool isHit = Physics.Raycast((Ray)ray, out hit);             //发出射线检测到了碰撞   isHit返回的是 一个bool值
            if (isHit)
            {
                Debug.Log("坐标为：" + hit.point);
               // Debug.DrawLine( hit.point, Color.green);
                target = hit.point; //检测到碰撞，就把检测到的点记录下来
            }
        }
        //如果检测到小球的坐标 与 碰撞的点坐标 距离大于0.1f，就移动小球的位置到 碰撞的点 ：target
        Ball.position = Vector3.Distance(Ball.position, target) > 0.1f ? Vector3.Lerp(Ball.position, target, Time.deltaTime) : target;
        //Move(target);//以上是Move函数的简写，此函数可不调用
    }


    /// <summary>
    /// 移动方法
    /// </summary>
    /// <param name="target"></param>
    void Move(Vector3 target)
    {
        if (Vector3.Distance(Ball.position, target) > 0.1f)
        {
            Ball.position = Vector3.Lerp(Ball.position, target, Time.deltaTime);
        }
        //如果物体的位置和目标点的位置距离小于 0.1时直接等于目标点
        else
            Ball.position = target;
    }

    public void OnTrig()
    {
        Ray ray = new Ray(transform.position, Vector3.down); //创建一条射线对象
        RaycastHit hit;                                             //碰撞信息对象结构体
        bool isRaycast = Physics.Raycast(ray, out hit);
        if (isRaycast)
        {
            Debug.DrawLine(ray.origin, hit.point, Color.green);

            print("坐标" + hit.transform.position);
            print("点" + hit.point);
            print("重心坐标" + hit.barycentricCoordinate);
            print("碰撞盒" + hit.collider);
            print("距离" + hit.distance);
            print("光线地图坐标" + hit.lightmapCoord);
            print("法线" + hit.normal);
            print("刚体" + hit.rigidbody);
            print("纹理坐标" + hit.textureCoord);
            print("三角指数" + hit.triangleIndex);//等等
        }
    }
}
