using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ModelData : MonoBehaviour
{
    private static ModelData _instance;

    public static ModelData Instance
    {
        get { return _instance; }

    }
    private void Awake()
    {
        _instance = this;
    }

    public Transform Xuanzhong;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
